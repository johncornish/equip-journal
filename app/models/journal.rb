class Journal < ApplicationRecord
  has_many :journal_entries, dependent: :destroy

  def journal_entries_by_collection
    jes_by_collection = ActiveSupport::OrderedHash.new { |h, k| h[k] = [] }
    jes = self.journal_entries.order(:created_at)
    jes.each do |je|
      d = Date.new(
        je.created_at.year,
        je.created_at.month,
        je.created_at.day,
      )
      jes_by_collection[d] << je
    end

    return jes_by_collection
  end
end
