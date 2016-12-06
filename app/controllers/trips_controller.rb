class TripsController < ApplicationController
 skip_before_filter :verify_authenticity_token

  def index
    @trips = Trip.all
  end

  def search
    @trips = Trip.find_by(country: params[:country])
    render json: @trips
  end

  private

  def trip_params
    params.require(:country).permit(:start_date, :description)
  end
end
