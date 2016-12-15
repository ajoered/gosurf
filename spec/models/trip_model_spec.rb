require 'rails_helper'

RSpec.describe Trip, type: :model do

  before :each do
    @user = User.create(name: "Alvaro", email: "alvaro@email.com", password: "12345678", level: "Advanced", phone_number:3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")

    @trip = @user.trips.create(

    user_id: 2,
    level: "Beginner",
    kind_of_trip: "Group",
    country_origin: "Spain",
    country_destination: "Spain",
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

  describe "automatic geocoding" do
    it "assigns values for destination latitude and longitude upon creation" do
      expect(@trip.destination_lat).to eq(36.5270612)
      expect(@trip.destination_lng).to eq(-6.2885962)
    end

    it "assigns values for origin latitude and longitude upon creation" do
      expect(@trip.origin_lat).to eq(40.4167754)
      expect(@trip.origin_lng).to eq(-3.7037902)
    end
  end

end
