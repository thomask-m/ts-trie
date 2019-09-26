// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
  // import "core-js/fn/array.find"
// ...
import { get } from 'lodash';

interface TrieNode {
  children: { [key: string]: TrieNode };
  value: string;
}

export default class Trie {
  root: TrieNode;
  constructor() {
    this.root = {
      children: {},
      value: '',
    };
  }

  find(key: string) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      if (get(node, `children.${char}`)) {
        node = node.children[char];
      } else {
        return null;
      }
    }
    return node.value;
  }

  insert(key: string, value: string) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      if (!get(node, `children.${char}`)) {
        node.children[char] = {
          children: {},
          value: '',
        };
      }
      node = node.children[char];
    }
    node.value = value;
  }
};
