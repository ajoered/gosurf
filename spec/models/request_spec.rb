# require "rails_helper"
#
# RSpec.describe Request, type: :model do
#
#   before :each do
#     @request = Request.new(trip_id: 1, user_id: 1, boards: 3)
#   end
#
#   describe ".max_requests_reached" do
#     it "is valid" do
#       expect(Request.new.max_requests_reached(@request.trip).to_eq(false)
#     end
#   end
#
#   describe ".approve" do
#     it "changes the status from false to true" do
#       expect(Request.new.approve).to_eq(true)
#     end
#   end
# end
