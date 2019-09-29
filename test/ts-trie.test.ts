import { toNullable } from 'fp-ts/lib/Option'
import Trie from '../src/ts-trie'

/**
 * Trie test
 */
describe('Trie test', () => {
  it('Trie is instantiable', () => {
    expect(new Trie()).toBeInstanceOf(Trie)
  })

  it('Trie.find() works as expected', () => {
    const trie = new Trie()
    trie.insert('asdf', 'Thomas')
    expect(toNullable(trie.find('asdf'))).toEqual('Thomas')
    expect(toNullable(trie.find('a'))).toEqual(null)
  })

  it('Trie.findNode() works as expected', () => {
    const trie = new Trie()
    trie.insert('asdf', 'Thomas')
    expect(toNullable(trie.findNode('asdf'))).toBeInstanceOf(Trie)
    expect(toNullable(trie.findNode('a'))).toEqual(null)
  })

  it('Trie.insert() multiple calls', () => {
    const trie = new Trie()
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as']
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i])
    }

    for (let i = 0; i < testKeys.length; i++) {
      expect(toNullable(trie.find(testKeys[i]))).toEqual(testKeys[i])
    }
  })

  it('Trie.insert() negative test', () => {
    const trie = new Trie()
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as']
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i])
    }
    expect(toNullable(trie.find('asd'))).toEqual(null)
    expect(toNullable(trie.find('a'))).toEqual(null)
    expect(toNullable(trie.find('b'))).toEqual(null)
    expect(toNullable(trie.find('bd'))).toEqual(null)
    expect(toNullable(trie.find('asdfg'))).toEqual(null)
  })

  it('Trie.match() works as expected', () => {
    const trie = new Trie()
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as']
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i])
    }
    expect(trie.match('asd')).toEqual(['asdf', 'asdfgh'])
    expect(trie.match('b')).toEqual(['bde'])
    expect(trie.match('f')).toEqual([])
    expect(trie.match('asdfgha')).toEqual([])
    expect(trie.match('ad')).toEqual([])
  })
})
