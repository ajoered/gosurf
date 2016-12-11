class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:approve]

  def approve
    @request = Request.find_by(id: params[:id])
    @request.approve
  end

  def create
    if user_signed_in?
      if check_same_user(params[:trip_id])
        @same_user_json = {status: 1}
        render json: @same_user_json
      else
        @request = current_user.requests.create(
              trip_id: params[:trip_id],
              comment: params[:comment])
        @request_success_json = {status: 3}
        render json: @request_success_json
      end
    else
      @no_user_json = {status: 2}
      render json: @no_user_json
      @error = "You must be logged in to create a trip!"
      redirect_to new_user_session_path
    end
  end

  private

  def check_same_user(trip_id)
    @trip = Trip.find_by(id: trip_id)
    (current_user.id == @trip.user.id)? true : false
  end
end
