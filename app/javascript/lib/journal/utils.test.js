import {
  entriesToCollections,
  entriesToPages,
} from './utils'

describe('entriesToCollections', () => {
  it('should return a unique list of collections without blanks, preserving their order', () => {
    const entries = [
      {text: 'Test entry text', collection: 'Test collection text 1'},
      {text: 'Test entry text', collection: ''},
      {text: 'Test entry text', collection: null},
      {text: 'Test entry text', collection: false},
      {text: 'Test entry text', collection: 'Test collection text 2'},
      {text: 'Test entry text', collection: undefined},
      {text: 'Test entry text'},
      {text: 'Test entry text', collection: 'Test collection text 3'},
    ]
    const expected = [
      'Test collection text 1',
      'Test collection text 2',
      'Test collection text 3',
    ]
    expect(entriesToCollections(entries)).toStrictEqual(expected)
  })
})

describe('entriesToPages', () => {
  it('should ', () => {
  })
})
