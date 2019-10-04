import { Option, some, none, toNullable, toUndefined } from 'fp-ts/lib/Option'

interface TrieNode<T> {
  children: { [key: string]: TrieNode<T> }
  value: Option<T>
}

/**
 * Simple [Trie] (https://en.wikipedia.org/wiki/Trie) implementation for strings.
 * This library is in its pre-release phase and shouldn't be used in production.
 */
export class Trie<V> {
  root: TrieNode<V>
  constructor() {
    this.root = {
      children: {},
      value: none
    }
  }

  find(key: string): Option<V> {
    const node = toNullable(this.findNode(key))
    return node ? node.value : none
  }

  findNode(key: string): Option<TrieNode<V>> {
    let node = this.root
    for (let i = 0; i < key.length; i++) {
      const c = key[i]
      if (!node.children[c]) {
        return none
      }
      node = node.children[c]
    }
    return some(node)
  }

  insert(key: string, value: V) {
    let node = this.root
    for (let i = 0; i < key.length; i++) {
      const c = key[i]
      if (!node.children[c]) {
        node.children[c] = {
          children: {},
          value: none
        }
      }
      node = node.children[c]
    }
    node.value = some(value)
  }

  match(key: string): V[] {
    let matches: V[] = []
    let nextNodes: TrieNode<V>[] = []
    let nodeOption = this.findNode(key)
    let node = toUndefined(nodeOption)

    while (node) {
      Object.keys(node.children).forEach(c => {
        if (node && node.children[c]) {
          nextNodes.push(node.children[c])
        }
      })

      const match = toNullable(node.value)
      if (match) {
        matches.push(match)
      }

      node = nextNodes.pop()
    }
    return matches
  }
}
