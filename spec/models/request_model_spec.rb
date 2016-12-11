require 'rails_helper'

RSpec.describe Request, :type => :model do

  before :each do
    @user = User.create(name: "Alvaro", email: "alvaro@email.com", password: "12345678", level: "Advanced", phone_number:639388023, bio: "Hey! My name is Miguel and I love to surf brah!")

    @trip = @user.trips.create(
    user_id: 2,
    level: "Beginner",
    kind_of_trip: "Group",
    country: "Spain",
    origin: "Madrid",
    destination: "Cadiz",
    start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
    finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
    max_users: 3,
    space_material: 3,
    description: "blablabla",
    price: 10)

    @request = @trip.requests.create(user_id: 1)
  end

  it "is valid with valid attributes" do
    expect(@request).to be_valid
  end

end
