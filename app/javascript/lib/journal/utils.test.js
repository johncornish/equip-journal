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
  it('should group entries by date and collection', () => {
    const entries = [
      {text: "Test entry text 1", created_at_js: "2000-01-07 01:02:01.001", collection: 'Test collection 1'},
      {text: "Test entry text 2", created_at_js: "2000-01-02 01:02:01.001"},
      {text: "Test entry text 3", created_at_js: "2000-01-03 01:01:01.001"},
      {text: "Test entry text 4", created_at_js: "2000-01-03 01:02:01.001", collection: 'Test collection 2'},
      {text: "Test entry text 5", created_at_js: "2000-01-02 01:01:01.001", collection: 'Test collection 3'},
    ]
    const expectedPages = [
      {
        title: '1-2-2000',
        entries: [
          {text: "Test entry text 5", created_at_js: "2000-01-02 01:01:01.001", collection: 'Test collection 3'},
          {text: "Test entry text 2", created_at_js: "2000-01-02 01:02:01.001"},
        ]
      },
      {
        title: 'Test collection 3',
        entries: [
          {text: "Test entry text 5", created_at_js: "2000-01-02 01:01:01.001", collection: 'Test collection 3'},
        ]
      },
      {
        title: '1-3-2000',
        entries: [
          {text: "Test entry text 3", created_at_js: "2000-01-03 01:01:01.001"},
          {text: "Test entry text 4", created_at_js: "2000-01-03 01:02:01.001", collection: 'Test collection 2'},
        ]
      },
      {
        title: 'Test collection 2',
        entries: [
          {text: "Test entry text 4", created_at_js: "2000-01-03 01:02:01.001", collection: 'Test collection 2'},
        ]
      },
      {
        title: '1-7-2000',
        entries: [
          {text: "Test entry text 1", created_at_js: "2000-01-07 01:02:01.001", collection: 'Test collection 1'},
        ]
      },
      {
        title: 'Test collection 1',
        entries: [
          {text: "Test entry text 1", created_at_js: "2000-01-07 01:02:01.001", collection: 'Test collection 1'},
        ]
      },
    ]
    expect(entriesToPages(entries)).toStrictEqual(expectedPages)
  })
})
