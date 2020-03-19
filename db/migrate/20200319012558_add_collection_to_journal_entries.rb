class AddCollectionToJournalEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :journal_entries, :collection, :string
  end
end
