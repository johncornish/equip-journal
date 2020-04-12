class JournalEntry < ApplicationRecord
  belongs_to :journal
  has_one :task, dependent: :destroy
  attribute :created_at_js, :string

  def in_collection?
    return !self.collection.to_s.strip.empty?
  end

  def is_task?
    return !self.task.nil?
  end

  def created_at_js
    return self.created_at.strftime('%Y-%m-%d %H:%M:%S.%3N')
  end
end
