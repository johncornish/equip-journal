require 'test_helper'

class JournalEntryTest < ActiveSupport::TestCase
  setup do
    Journal.destroy_all
    JournalEntry.destroy_all
  end

  test "belongs to a journal" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je1 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    je2 = JournalEntry.create!(
      text: 'Test journal entry text 2',
      journal_id: j.id,
    )

    assert_equal j.journal_entries.first, je1
    assert_equal j.journal_entries.second, je2
    assert_equal je1.journal, j
    assert_equal je2.journal, j
  end

  test "is deleted when its journal is deleted" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )

    assert_equal 1, JournalEntry.all.length
    j.destroy
    assert_equal 0, JournalEntry.all.length
  end
end
