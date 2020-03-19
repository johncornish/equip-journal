json.extract! journal_entry, :id, :journal_id, :text, :collection, :created_at, :updated_at
json.url journal_entry_url(journal_entry, format: :json)
