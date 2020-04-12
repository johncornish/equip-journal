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

  test "knows if it's a task or not" do
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
      task: nil,
    )
    je3 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
      task_id: nil,
    )
    je4 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    Task.create!(
      journal_entry: je4,
    )

    assert !je1.is_task?
    assert !je2.is_task?
    assert !je3.is_task?
    assert je4.is_task?
  end

  test "has a created_at_js attribute specifically to bridge the gap betweeen Ruby and JS" do
    j = Journal.create!(
      name: 'Test journal',
    )
    t = Time.utc(2001, 2, 3, 4, 5, 6.5)
    Timecop.travel(t)
    je1 = JournalEntry.create!(
      text: 'Test journal entry text',
      journal: j,
    )
    t = Time.utc(2010, 12, 30, 16, 55, 55)
    Timecop.travel(t)
    je2 = JournalEntry.create!(
      text: 'Test journal entry text',
      journal: j,
    )
    assert_equal je1.created_at_js, "2001-02-03 04:05:06.500"
    assert_equal je2.created_at_js, "2010-12-30 16:55:55.000"
  end
end
