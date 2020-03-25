require 'test_helper'

require 'pp'

class JournalTest < ActiveSupport::TestCase
  test "group journal entries by date and collection" do
    j = Journal.create!(
      name: 'test-journal',
    )

    t = Time.local(2000, 1, 1, 10, 5, 0)
    Timecop.travel(t)
    je1 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-1',
      collection: 'test-collection-text-1',
    )
    je2 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-2',
    )
    t = Time.local(2000, 1, 1, 10, 0, 0)
    Timecop.travel(t)
    je3 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-3',
      collection: 'test-collection-text-2',
    )
    t = Time.local(2000, 1, 1, 9, 0, 0)
    Timecop.travel(t)
    je4 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-4',
    )
    t = Time.local(2000, 1, 12, 10, 0, 0)
    Timecop.travel(t)
    je5 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-5',
    )

    expected = ActiveSupport::OrderedHash.new
    expected['1-1-2000'] = [je4, je3, je1, je2]
    expected['test-collection-text-2'] = [je3]
    expected['test-collection-text-1'] = [je1]
    expected['1-12-2000'] = [je5]

    assert_equal expected, j.journal_entries_by_collection
  end

  test "put task entries at the beginning of the current day" do
    j = Journal.create!(
      name: 'test-journal',
    )

    t = Time.local(2000, 1, 1, 10, 5, 0)
    Timecop.travel(t)
    je1 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-1',
    )
    Task.create!(
      journal_entry: je1,
    )
    je2 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-2',
    )
    t = Time.local(2000, 1, 1, 10, 0, 0)
    Timecop.travel(t)
    je3 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-3',
    )
    Task.create!(
      journal_entry: je3,
    )
    t = Time.local(2000, 1, 1, 9, 0, 0)
    Timecop.travel(t)
    je4 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-4',
    )
    t = Time.local(2000, 1, 12, 10, 0, 0)
    Timecop.travel(t)
    je5 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-5',
    )
    Task.create!(
      journal_entry: je5,
    )

    expected = ActiveSupport::OrderedHash.new
    expected['1-1-2000'] = [je4, je3, je1, je2]
    expected['1-12-2000'] = [je3, je1, je5, je5]

    assert_equal expected, j.journal_entries_by_collection
  end
end
