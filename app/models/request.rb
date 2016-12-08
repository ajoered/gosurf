class Request < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  def approve
    if reached_max_users
      errors[:base] << "You have reached the maximum number of users"
    else
      self.status = true
      self.save
    end
  end

  def reached_max_users
    @true_requests = self.trip.requests.where(status: true)
    (@true_requests.length >= self.trip.max_users)? true : false
  end
  #
  # def approve!
  #   update(status: true)
  # end

end
