class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:approve]

  def approve
    @request = Request.find_by(id: params[:id])
    @request.approve
  end

  # def new
  #
  #     @trip = current_user.trips.new
  #   else
  #     @error = "You must be logged in to create a trip!"
  #     redirect_to new_user_session_path
  #   end
  # end
  #
  # def create
  #   @request = current_user.requests.new(
  #           trip_id: params[:trip_id])
  #   check_self_request(params[:trip_id])
  #   redirect_to root_path
  # end

end
