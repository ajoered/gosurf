require 'rails_helper'

RSpec.describe Api::TripsController, type: :controller do

  describe "POST #search" do
    before :each do
    @user = User.create(name: "example8", email: "example8@email.com", password: "12345678", level: "Advanced", phone_number: 3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")


    @trip1 = @user.trips.create(
      level: "Beginner",
      kind_of_trip: "Group",
      country_origin: "Spain",
      country_destination: "Spain",
      origin: "Madrid",
      destination: "Madrid",
      start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
      finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
      max_users: 3,
      space_material: 3,
      description: "blablabla",
      price: 10)

    @yes_trips_country = "Spain"
    @no_trips_country = "USA"
    @trips = Trip.where(country_origin: @yes_trips_country)
  end

    context "when there are trips from that country" do

      it "Returns a 200 status" do
        post :search, :params => {country_origin: @yes_trips_country}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with a country array" do
        post :search, :params => {country_origin: @yes_trips_country}
        expect(response).to eq(@trips)
      end

    end
  end
end
