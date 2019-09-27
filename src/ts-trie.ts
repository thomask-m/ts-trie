import { Option, some, none, toNullable, toUndefined, isSome, getOrElse } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

interface TrieNode {
  children: { [key: string]: TrieNode }
  value: Option<string>
}

export default class Trie {
  root: TrieNode
  constructor() {
    this.root = {
      children: {},
      value: none
    }
  }

  find(key: string): Option<string> {
    const node = toNullable(this.findNode(key))
    return node ? node.value : none
  }

  findNode(key: string): Option<TrieNode> {
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

  insert(key: string, value: string) {
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

  match(key: string): string[] {
    let matches: string[] = []
    let nodeOption = this.findNode(key)
    let node = toUndefined(nodeOption)
    let nextNodes: TrieNode[] = []

    while (node) {
      Object.keys(node.children).forEach(c => {
        if (node && node.children[c]) {
          nextNodes.push(node.children[c])
        }
      })

      if (node && isSome(node.value)) {
        const value = pipe(
          node.value,
          getOrElse(() => '')
        )
        matches.push(value)
      }

      node = nextNodes.pop()
    }
    return matches
  }
}
