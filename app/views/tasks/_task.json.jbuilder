json.extract! task, :id, :journal_entry_id, :is_complete, :created_at, :updated_at
json.url task_url(task, format: :json)
