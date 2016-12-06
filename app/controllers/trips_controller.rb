class TripsController < ApplicationController
 skip_before_filter :verify_authenticity_token

  def index
    @trips = Trip.all
  end

  def search
    @country = params[:country]
    @trips = Trip.find_by(country: @country)
	  unless @trips
	    render json: {error: "No trips found"},
	    status: 404
	    return
	  end
	  render json: @trips
  end

  # private
  #
  # def trip_params
  #   params.require(:country).permit(:start_date, :description)
  # end
end
