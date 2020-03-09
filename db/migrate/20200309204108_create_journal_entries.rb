class CreateJournalEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :journal_entries do |t|
      t.integer :journal_id
      t.text :text

      t.timestamps
    end
  end
end
