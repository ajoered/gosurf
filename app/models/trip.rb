class Trip < ApplicationRecord
  has_many :requests
  has_many :users, through: :requests
  belongs_to :user

  validates :origin,      presence: true, length: { maximum: 250 }
	validates :start_date, 	presence: true
  validates :user, 	      presence: true

  geocoded_by :origin
#   before_save :geocode_the_destination
#   after_validation :geocode
#
# def geocode_the_destination
#   coords = Geocoder.coordinates(self.start)
#   self.destination_lat = coords[0]
#   self.destination_lng = coords[1]
# end


  def max_requests_reached
    @requests = @trip.requests.select { |request| request.status = true }
    if (@requests.length > @trip.max_users)
      errors.add(:base, 'Exceeded user limit')
    end
  end

end
