import Trie from "../src/ts-trie"

/**
 * Dummy test
 */
describe("Trie test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy();
  });

  it("Trie is instantiable", () => {
    expect(new Trie()).toBeInstanceOf(Trie);
  });

  it("Trie.find() works as expected", () => {
    const trie = new Trie();
    trie.insert('asdf', 'Thomas');
    expect(trie.find('asdf')).toEqual('Thomas');
    expect(trie.find('a')).toEqual('');
  });
});
