class TripsController < ApplicationController
 skip_before_action :verify_authenticity_token

  def index
    @trips = Trip.all
  end

  def search
    @country = params[:country]
    @trips = []
    @trips = Trip.where(country: @country)
	  unless @trips
	    render json: {error: "No trips found"},
	    status: 404
	    return
	  end
	  render json: @trips
  end

  def new
    if user_signed_in?
      @trip = current_user.trips.new
    else
      @error = "You must be logged in to create a trip!"
      redirect_to new_user_session_path
    end
  end

  def create
    @user = current_user
    @trip = @user.trips.create(
            level: params[:trip][:level],
            description: params[:trip][:description],
        		kind_of_trip: params[:trip][:kind_of_trip],
        		origin: params[:trip][:origin],
            country: params[:trip][:country],
            destination: params[:trip][:destination],
            start_date: params[:trip][:start_date],
            finish_date: params[:trip][:finish_date],
            max_users: params[:trip][:max_users],
            space_material: params[:trip][:space_material])

        	redirect_to root_path
  end

  private

  def signed_in_user
    unless current_user
      redirect_to new_user_session_path, notice: 'Access forbidden.'
    end
  end
  #
  # def trip_params
  #   params.require(:country).permit(:start_date, :description)
  # end
end
