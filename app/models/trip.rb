class Trip < ApplicationRecord
  has_many :requests
  has_many :users, through: :requests
  belongs_to :user

  validates :origin,      presence: true, length: { maximum: 250 }
	validates :start_date, 	presence: true
  validates :user, 	      presence: true

  before_save :geocode_the_origin
  before_save :geocode_the_destination
  after_validation :geocode_the_origin
  after_validation :geocode_the_destination

  def geocode_the_destination
    coords = Geocoder.coordinates(self.destination + ", " + self.country)
    self.destination_lat = coords[0]
    self.destination_lng = coords[1]
  end

  def geocode_the_origin
    coords = Geocoder.coordinates(self.origin + ", " + self.country)
    self.origin_lat = coords[0]
    self.origin_lng = coords[1]
  end


end
