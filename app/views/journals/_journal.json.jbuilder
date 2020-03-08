json.extract! journal, :id, :name, :created_at, :updated_at
json.url journal_url(journal, format: :json)
