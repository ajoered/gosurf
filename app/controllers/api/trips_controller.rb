class Api::TripsController < ApplicationController
 skip_before_action :verify_authenticity_token, only: [:search]

  def search
    @country = params[:country_origin]
    @trips = Trip.where(country_origin: @country)
	  if @trips.empty?
	    @trips = {country: @country}
	  end
	  render json: @trips
  end

end
