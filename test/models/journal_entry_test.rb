require 'test_helper'

class JournalEntryTest < ActiveSupport::TestCase
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

    assert_difference('JournalEntry.count', -1) do
      j.destroy
    end
  end

  test "knows if it's in a custom collection or not" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je1 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    je2 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
      collection: '',
    )
    je3 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
      collection: 'some collection string',
    )

    assert !je1.in_collection?
    assert !je2.in_collection?
    assert je3.in_collection?
  end
end
