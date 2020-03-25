class JournalEntry < ApplicationRecord
  belongs_to :journal
  has_one :task, dependent: :destroy

  def in_collection?
    return !self.collection.to_s.strip.empty?
  end

  def is_task?
    return !self.task.nil?
  end
end
