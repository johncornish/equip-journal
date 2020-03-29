require 'test_helper'

class TaskTest < ActiveSupport::TestCase
  test "belongs to a journal entry" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je1 = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    je2 = JournalEntry.create!(
      text: 'Test journal entry text 2',
      journal: j,
    )
    t = Task.create!(
      journal_entry: je1,
    )

    assert_equal je1.task, t
    assert_nil je2.task
  end

  test "is deleted when its journal entry is deleted" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    t = Task.create!(
      journal_entry: je,
    )

    assert_difference('Task.count', -1) do
      je.destroy
    end
  end

  test "creates a default task from journal entry" do
    j = Journal.create!(
      name: 'Test journal',
    )
    je = JournalEntry.create!(
      text: 'Test journal entry text 1',
      journal: j,
    )
    t = nil

    assert_difference('Task.count') do
      t = Task.new_default_from_journal_entry(je)
    end

    assert_equal je, t.journal_entry
  end
end
