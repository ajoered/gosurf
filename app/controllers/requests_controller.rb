class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:approve]

  def approve
    @request = Request.find_by(id: params[:request_id])
    @request.approve
  end

  def new
    if user_signed_in?
      @request = current_user.requests.new(trip_id: params[:trip_id])
    else
      @error = "You must be logged in to create a trip!"
      redirect_to root_path
    end
  end

  def create
    @request = current_user.requests.create(
            trip_id: params[:trip_id])
    redirect_to root_path
  end

end
