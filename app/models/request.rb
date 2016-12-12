class Request < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  def approve
      self.status = true
      self.save
  end

end
