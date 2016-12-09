class Trip < ApplicationRecord
  has_many :requests
  has_many :users, through: :requests
  belongs_to :user

  validates :origin,      presence: true, length: { maximum: 250 }
	validates :start_date, 	presence: true
  validates :user, 	      presence: true

  geocoded_by :origin
  after_validation :geocode

  def max_requests_reached
    @requests = @trip.requests.select { |request| request.status = true }
    if (@requests.length > @trip.max_users)
      errors.add(:base, 'Exceeded user limit')
    end
  end

end
