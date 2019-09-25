import Trie from "../src/ts-trie"

/**
 * Dummy test
 */
describe("Trie test", () => {
  it("works if true is truthy", () => {
    expect(true).toBeTruthy()
  })

  it("Trie is instantiable", () => {
    expect(new Trie()).toBeInstanceOf(Trie)
  })
})
