require 'rails_helper'

RSpec.describe Api::RequestsController, type: :controller do

  describe "POST #create" do
    before :each do
      @user = User.create(name: "example7", email: "example7@email.com", password: "12345678", level: "Advanced", phone_number: 3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")

      @trip = @user.trips.create(
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

    context "when user is not signed in" do

      it "Returns a 200 status" do
        post :create, :params => {trip_id: @trip.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 2" do
        post :create, :params => {trip_id: @trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(2)
      end

    end

    context "when user is signed in and user is owner" do

      before(:each) do
        sign_in @user
      end

      it "Returns a 200 status" do
        post :create, :params => {trip_id: @trip.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 1" do
        post :create, :params => {trip_id: @trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(1)
      end

    end

    context "when user is signed in and user is not owner" do

      before(:each) do
        sign_in @user

        @other_user = User.create(name: "Other6", email: "other6@email.com", password: "12345678", level: "Advanced", phone_number: 3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")

        @other_trip = @other_user.trips.create(
        level: "Beginner",
        kind_of_trip: "Group",
        country_origin: "USA",
        country_destination: "Spain",
        origin: "Madrid",
        destination: "Madrid",
        start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
        finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
        max_users: 3,
        space_material: 3,
        description: "blablabla",
        price: 10)

      end

      it "Returns a 200 status" do
        post :create, :params => {trip_id: @other_trip.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 3" do
        post :create, :params => {trip_id: @other_trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(3)
      end

    end

    context "when user is signed in and user is not owner and trip has reached max_users" do

      before(:each) do
        sign_in @user

        @other_user_2 = User.create(name: "Other7", email: "other7@email.com", password: "12345678", level: "Advanced", phone_number: 3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")

        @full_trip = @other_user_2.trips.create(
        level: "Beginner",
        kind_of_trip: "Group",
        country_origin: "USA",
        country_destination: "Spain",
        origin: "Madrid",
        destination: "Madrid",
        start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
        finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
        max_users: 0,
        space_material: 3,
        description: "blablabla",
        price: 10)

      end

      it "Returns a 200 status" do
        post :create, :params => {trip_id: @full_trip.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 4" do
        post :create, :params => {trip_id: @full_trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(4)
      end

    end

    context "when user is signed in and has already requested to join" do

      before(:each) do
        sign_in @user

        @other_user_3 = User.create(name: "Other8", email: "other8@email.com", password: "12345678", level: "Advanced", phone_number: 3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")

        @already_requested_trip = @other_user_3.trips.create(
        level: "Beginner",
        kind_of_trip: "Group",
        country_origin: "USA",
        country_destination: "Spain",
        origin: "Madrid",
        destination: "Madrid",
        start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
        finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
        max_users: 4,
        space_material: 3,
        description: "blablabla",
        price: 10)

        request = @user.requests.create(trip_id: @already_requested_trip.id)

      end

      it "Returns a 200 status" do
        post :create, :params => {trip_id: @already_requested_trip.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 5" do
        post :create, :params => {trip_id: @already_requested_trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(5)
      end

    end
  end

  describe "POST #approve" do
    before :each do
      @request = Request.create(user_id: 1, trip_id: 1)
    end

      it "Approves the request" do
        post :approve, :params => {id: @request.id}
        expect(response.status).to eq(200)
      end

      it "returns a JSON with Status 5" do
        post :create, :params => {trip_id: @already_requested_trip.id}
        expect(JSON.parse(response.body)["status"]).to eq(5)
      end

  end

end
