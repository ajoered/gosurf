class Trip < ApplicationRecord
  has_many :requests
  has_many :users, through: :requests
  belongs_to :user
end
