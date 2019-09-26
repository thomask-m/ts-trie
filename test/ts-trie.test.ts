import Trie from '../src/ts-trie';

/**
 * Trie test
 */
describe('Trie test', () => {
  it('Trie is instantiable', () => {
    expect(new Trie()).toBeInstanceOf(Trie);
  });

  it('Trie.find() works as expected', () => {
    const trie = new Trie();
    trie.insert('asdf', 'Thomas');
    expect(trie.find('asdf')).toEqual('Thomas');
    expect(trie.find('a')).toEqual(null);
  });

  it('multiple Trie.insert() calls', () => {
    const trie = new Trie();
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as'];
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i]);
    }

    for (let i = 0; i < testKeys.length; i++) {
      expect(trie.find(testKeys[i])).toEqual(testKeys[i]);
    }
  });

  it('negative test Trie.insert() calls', () => {
    const trie = new Trie();
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as'];
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i]);
    }
    expect(trie.find('asd')).toEqual(null);
    expect(trie.find('a')).toEqual(null);
    expect(trie.find('b')).toEqual(null);
    expect(trie.find('bd')).toEqual(null);
    expect(trie.find('asdfg')).toEqual(null);
  });

  it('Trie.match() works as expected', () => {
    const trie = new Trie();
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as'];
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i]);
    }
    const expectedMatch = ['asdf', 'asdfgh'];
    expect(trie.match('asd')).toEqual(expectedMatch);
  });
});
