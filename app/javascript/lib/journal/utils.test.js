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
      {text: "Test entry text 1", created_at_js: "2000-01-02 01:01:01.001"},
      {text: "Test entry text 2", created_at_js: "2000-01-02 01:01:01.001"},
    ]
    const expectedPages = [
      {
        title: '1-2-2000',
        entries: [
          {text: "Test entry text 1", created_at_js: "2000-01-02 01:01:01.001"},
          {text: "Test entry text 2", created_at_js: "2000-01-02 01:01:01.001"},
        ]
      }
    ]
    expect(entriesToPages(entries)).toStrictEqual(expectedPages)
  })
})
//
// test "group journal entries by date and collection" do
//   j = Journal.create!(
//     name: 'test-journal',
//   )
//
//   t = Time.local(2000, 1, 1, 10, 5, 0)
//   Timecop.travel(t)
//   je1 = JournalEntry.create!(
//     journal: j,
//     text: 'test-entry-text-1',
//     collection: 'test-collection-text-1',
//   )
//   je2 = JournalEntry.create!(
//     journal: j,
//     text: 'test-entry-text-2',
//   )
//   t = Time.local(2000, 1, 1, 10, 0, 0)
//   Timecop.travel(t)
//   je3 = JournalEntry.create!(
//     journal: j,
//     text: 'test-entry-text-3',
//     collection: 'test-collection-text-2',
//   )
//   t = Time.local(2000, 1, 1, 9, 0, 0)
//   Timecop.travel(t)
//   je4 = JournalEntry.create!(
//     journal: j,
//     text: 'test-entry-text-4',
//   )
//   t = Time.local(2000, 1, 12, 10, 0, 0)
//   Timecop.travel(t)
//   je5 = JournalEntry.create!(
//     journal: j,
//     text: 'test-entry-text-5',
//   )
//
//   expected = ActiveSupport::OrderedHash.new
//   expected['1-1-2000'] = [je4, je3, je1, je2]
//   expected['test-collection-text-2'] = [je3]
//   expected['test-collection-text-1'] = [je1]
//   expected['1-12-2000'] = [je5]
//
//   assert_equal expected, j.journal_entries_by_collection
// end
