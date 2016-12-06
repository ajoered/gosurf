class TripsController < ApplicationController
 skip_before_filter :verify_authenticity_token

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
  end

  # private
  #
  # def trip_params
  #   params.require(:country).permit(:start_date, :description)
  # end
end
