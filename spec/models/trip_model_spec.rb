require 'rails_helper'

RSpec.describe Trip, :type => :model do

  before :each do
    @user = User.new(name: "Alvaro", email: "alvaro@email.com", password: "12345678", level: "Advanced", phone_number:639388023, bio: "Hey! My name is Miguel and I love to surf brah!")

    @trip = @user.trips.new(
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
  end

  it "is valid with valid attributes" do
    expect(@trip).to be_valid
  end

    describe "geocode_the_destination" do
      it "assigns values for destination latitude and longitude upon creation" do
        expect(@trip.destination_lat).to be_valid
      end

  end

end
