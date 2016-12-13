class Api::RequestsController < ApplicationController
  before_action :find_trip
  skip_before_action :verify_authenticity_token

  def approve
    @request = Request.find_by(id: params[:id])
    if @request.trip.reached_max_users
      max_user_json = {status: 4}
      render json: max_user_json
    else
      @request.approve
      request_success_json = {status: 3}
      render json: request_success_json
    end
  end

  def create
    if user_signed_in?
      if @trip.check_user_is_owner(current_user.id)
        check_user_is_owner = {status: 1}
        render json: check_user_is_owner
      elsif @trip.reached_max_users
        max_user_json = {status: 4}
        render json: max_user_json
      elsif @trip.same_user_request(current_user.id)
        doubled_request_json = {status: 5}
        render json: doubled_request_json
      else
        @request = current_user.requests.create(
              trip_id: params[:trip_id],
              comment: params[:comment])
        request_success_json = {status: 3}
        render json: request_success_json
      end
    else
      no_user_json = {status: 2}
      render json: no_user_json
      @error = "You must be logged in to create a trip!"
    end
  end

  private

  def find_trip
    @trip = Trip.find_by(id: params[:trip_id])
  end

end
