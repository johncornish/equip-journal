class Task < ApplicationRecord
  belongs_to :journal_entry

  def self.new_default_from_journal_entry(journal_entry)
    task = Task.new(
      journal_entry: journal_entry,
    )

    if !task.save
      raise "Could not save default new task for JournalEntry. You hecked up bad."
    end

    return task
  end
end
