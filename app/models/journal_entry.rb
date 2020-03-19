class JournalEntry < ApplicationRecord
  belongs_to :journal

  def in_collection?
    return !self.collection.to_s.strip.empty?
  end
end
