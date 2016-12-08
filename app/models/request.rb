class Request < ApplicationRecord
  belongs_to :trip
  belongs_to :user

  def approve!
    self.status = true
    binding.pry
    if max_requests_reached(self.trip)
      errors.add(:base, 'Exceeded user limit')
    else
    self.save
    end
  end

  def max_requests_reached(trip)
    @trip = trip
    @true_requests = @trip.requests.select { |request| request.status = true }
    (@true_requests.length > @trip.max_users)? true : false
  end

  def approve!
    update(status: true)
  end
end
