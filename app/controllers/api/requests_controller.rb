class Api::RequestsController < ApplicationController
  before_action :find_trip
  skip_before_action :verify_authenticity_token

  def approve
    @request = Request.find_by(id: params[:id])
    if @request.trip.reached_max_users
      render json: {status: 4}
    else
      @request.approve
      render json: {status: 3}
    end
  end

  def create
    if user_signed_in?
      if @trip.check_user_is_owner(current_user.id)
        render json: {status: 1}
      elsif @trip.reached_max_users
        render json: {status: 4}
      elsif @trip.same_user_request(current_user.id)
        render json: {status: 5}
      else
        @request = current_user.requests.create(
              trip_id: params[:trip_id],
              comment: params[:comment])
        render json: {status: 3}
      end
    else
      render json: {status: 2}
      @error = "You must be logged in to create a trip!"
    end
  end

  private

  def find_trip
    @trip = Trip.find_by(id: params[:trip_id])
  end

end
