class Api::TripsController < ApplicationController
 skip_before_action :verify_authenticity_token, only: [:search]

  def search
    @country = params[:country]
    @trips = Trip.where(country: @country)
	  if @trips == []
	    @trips = {country: @country}
	  end
	  render json: @trips
  end

end
