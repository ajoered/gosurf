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

  # def check_self_request(trip_id)
  #   @trip = Trip.find_by(id: trip_id)
  #   if current_user.id == @trip.user
  #     errors.add(:base, 'Exceeded user limit')
  #   else
  #     self.save
  #   end
  # end
  #
  # def approve!
  #   update(status: true)
  # end

end
