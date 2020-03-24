class JournalEntry < ApplicationRecord
  belongs_to :journal
  has_one :task, dependent: :destroy

  def in_collection?
    return !self.collection.to_s.strip.empty?
  end
end
