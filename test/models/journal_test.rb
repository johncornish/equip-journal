require 'test_helper'

class JournalTest < ActiveSupport::TestCase
  test "group journal entries by date" do
    j = Journal.create!(
      name: 'test-journal',
    )

    t = Time.local(2000, 1, 1, 10, 5, 0)
    Timecop.travel(t)
    je1 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-1',
    )
    t = Time.local(2000, 1, 1, 10, 0, 0)
    Timecop.travel(t)
    je2 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-2',
    )
    t = Time.local(2000, 1, 12, 10, 0, 0)
    Timecop.travel(t)
    je3 = JournalEntry.create!(
      journal: j,
      text: 'test-entry-text-3',
    )

    expected = ActiveSupport::OrderedHash.new
    expected[Date.new(2000, 1, 1)] = [je2, je1]
    expected[Date.new(2000, 1, 12)] = [je3]
    assert_equal expected, j.journal_entries_by_collection
  end
end
