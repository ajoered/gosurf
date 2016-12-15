class Api::TripsController < ApplicationController
 skip_before_action :verify_authenticity_token, only: [:search]

  def search
    @country = params[:country_origin]
    @from_date = params[:from_date]
    @to_date = params[:to_date]
    @trips_country = Trip.where(country_origin: @country)

    if (!@from_date.empty? && !@to_date.empty? && !@trips_country.empty?)
      @trips_date = @trips_country.where(start_date: params[:from_date]..params[:to_date])
      if @trips_date.empty?
        render json: {country: @country, status: 2}
      else
        render json: @trips_date
      end
    elsif (@trips_country.empty?)
      render json: {country: @country, status: 1}
    else
      render json: @trips_country
    end

  end

end
