class Request < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  def approve
    self.status = true
    self.save
  end

  def reached_max_users
    @true_requests = trip.last.requests.where(status: true)
    (@true_requests.length > self.trip.max_users)? true : false
  end
  #
  # def approve!
  #   update(status: true)
  # end

end
