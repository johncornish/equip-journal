class Journal < ApplicationRecord
  has_many :journal_entries, dependent: :destroy

  def journal_entries_by_collection
    tasks = []
    jes_by_collection = ActiveSupport::OrderedHash.new { |h, k| h[k] = [] }
    jes = self.journal_entries.order(:created_at)
    jes.each do |je|
      d_str = "#{je.created_at.month}-#{je.created_at.day}-#{je.created_at.year}"
      jes_by_collection[d_str] << je
      if je.in_collection?
        jes_by_collection[je.collection] << je
      end

      if je.is_task?
        tasks << je
      end
    end

    jes_by_collection[Time.now.strftime('%-m-%-d-%Y')].insert(0, *tasks)

    return jes_by_collection
  end
end
