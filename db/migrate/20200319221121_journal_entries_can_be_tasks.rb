class JournalEntriesCanBeTasks < ActiveRecord::Migration[6.0]
  def change
    add_column :journal_entries, :task_id, :integer
  end
end
