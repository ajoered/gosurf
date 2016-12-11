class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:approve]

  def approve
    @request = Request.find_by(id: params[:id])
    @request.approve
  end

  def create
    if user_signed_in?
      @request = current_user.requests.create(
            trip_id: params[:trip_id],
            comment: params[:comment])
    else
      @error = "You must be logged in to create a trip!"
      redirect_to new_user_session_path
    end
  end
end
