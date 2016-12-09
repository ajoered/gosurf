class Api::TripsController < ApplicationController

  def search
    @country = params[:country]
    @trips = Trip.where(country: @country)
	  unless @trips
	    render json: {error: "No trips found"},
	    status: 404
	    return
	  end
	  render json: @trips
  end

end
