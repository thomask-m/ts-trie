import { Trie } from '../src/ts-trie'
import { toNullable, some } from 'fp-ts/lib/Option'

/**
 * Trie test
 */
describe('Trie test', () => {
  it('Trie is instantiable', () => {
    expect(new Trie<string>()).toBeInstanceOf(Trie)
  })

  it('Trie.find() works as expected', () => {
    const trie = new Trie<string>()
    trie.insert('asdf', 'Thomas')
    expect(toNullable(trie.find('asdf'))).toEqual('Thomas')
    expect(toNullable(trie.find('a'))).toEqual(null)
    expect(toNullable(trie.find('b'))).toEqual(null)
  })

  it('Trie.findNode() works as expected', () => {
    const trie = new Trie<string>()
    trie.insert('asdf', 'Thomas')
    expect(toNullable(trie.findNode('asdf'))).toEqual({
      value: some('Thomas'),
      children: {}
    })

    const expectedTrieWhenKeyNotFound = {
      children: {
        s: {
          children: {
            d: {
              children: { f: { children: {}, value: { _tag: 'Some', value: 'Thomas' } } },
              value: { _tag: 'None' }
            }
          },
          value: { _tag: 'None' }
        }
      },
      value: { _tag: 'None' }
    }
    expect(toNullable(trie.findNode('a'))).toEqual(expectedTrieWhenKeyNotFound)
  })

  it('Trie.insert() multiple calls', () => {
    const trie = new Trie<string>()
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as']
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i])
    }

    for (let i = 0; i < testKeys.length; i++) {
      expect(toNullable(trie.find(testKeys[i]))).toEqual(testKeys[i])
    }
  })

  it('Trie.insert() negative test', () => {
    const trie = new Trie<string>()
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
    const trie = new Trie<string>()
    const testKeys = ['asdf', 'bde', 'asdfgh', 'as']
    for (let i = 0; i < testKeys.length; i++) {
      trie.insert(testKeys[i], testKeys[i])
    }
    expect(trie.match('asd')).toEqual(['asdf', 'asdfgh'])
    expect(trie.match('b')).toEqual(['bde'])
    expect(trie.match('f')).toEqual([])
    expect(trie.match('asdfgha')).toEqual([])
    expect(trie.match('ad')).toEqual([])
    expect(trie.match('hhh')).toEqual([])
  })
})
