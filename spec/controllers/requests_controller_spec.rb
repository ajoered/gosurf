require 'rails_helper'

RSpec.describe Api::RequestsController, type: :controller do

  describe "POST #approve" do
    # before :each do
    #   @user = User.create(name: "Alvaro", email: "alvaro@email.com", password: "12345678", level: "Advanced", phone_number:3108821488, bio: "Hey! My name is Miguel and I love to surf brah!")
    #
    #   # @trip = @user.trips.create(
    #   # user_id: 2,
    #   # level: "Beginner",
    #   # kind_of_trip: "Group",
    #   # country_origin: "Spain",
    #   # country_destination: "Spain",
    #   # origin: "Madrid",
    #   # destination: "Cadiz",
    #   # start_date: "Fri, 16 Dec 2016 17:58:47 +0100",
    #   # finish_date: "Sun, 18 Dec 2016 17:58:47 +0100",
    #   # max_users: 3,
    #   # space_material: 3,
    #   # description: "blablabla",
    #   # price: 10)
    #   #
    #   # @request = @user.requests.create(trip_id: 1)
    #
    # end
    context "when trip is full" do
      before(:all) do
        request = Request.create(trip_id: 1, user_id: 1)
        @id = request.id
      end
      it "Returns a 4 status" do
        post :create, id: @id
        expect(response.status).to eq(4)
      end
    end

  end
end
