class Trip < ApplicationRecord
  has_many :requests
  has_many :users, through: :requests
  belongs_to :user

  validates :origin,      presence: true, length: { maximum: 250 }
	validates :start_date, 	presence: true
  validates :user, 	      presence: true

end
