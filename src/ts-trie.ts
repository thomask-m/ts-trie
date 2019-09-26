interface TrieNode {
  children: { [key: string]: TrieNode };
  value: string | null;
}

export default class Trie {
  root: TrieNode;
  constructor() {
    this.root = {
      children: {},
      value: '',
    };
  }

  find(key: string): string | null {
    const node = this.findNode(key);
    return node && node.value;
  }

  findNode(key: string): TrieNode | null {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const c = key[i];
      node = node.children[c] || null;
    }
    return node;
  }

  insert(key: string, value: string) {
    let node = this.root;
    for (let i = 0; i < key.length; i++) {
      const c = key[i];
      if (!node.children[c]) {
        node.children[c] = {
          children: {},
          value: null,
        };
      }
      node = node.children[c];
    }
    node.value = value;
  }

  match(key: string): string[] {
    let matches: string[] = [];
    let node = this.findNode(key);
    let nextNodes: TrieNode[] = [];
    while(node) {
      Object.keys(node.children).forEach((c) => {
        if (node && node.children[c]) {
          nextNodes.push(node.children[c]);
        }
      });

      if (node && node.value) {
        matches.push(node.value);
      }

      node = nextNodes.pop() || null;
    }
    return matches;
  }
};
