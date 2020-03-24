class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.integer :journal_entry_id
      t.boolean :is_complete

      t.timestamps
    end
  end
end
