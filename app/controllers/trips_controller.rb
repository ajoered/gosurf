class TripsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]
  def index
    @trips = Trip.all
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
            level:               params[:level],
            price:               params[:price],
            description:         params[:description],
        		kind_of_trip:        params[:kind_of_trip],
        		origin:              params[:origin],
            destination:         params[:destination],
            start_date:          params[:start_date],
            finish_date:         params[:finish_date],
            max_users:           params[:max_users],
            space_material:      params[:space_material],
            country_origin:      params[:country_origin],
            country_destination: params[:country_destination]
            )
  end

  def destroy
      @trip = Trip.find(params[:id])
    if current_user = @trip.user
      @trip.destroy
      respond_to do |format|
        format.html { redirect_to profile_path, notice: 'Trip was successfully destroyed.' }
      end
    else
      respond_to do |format|
        format.html { redirect_to profile_path, notice: 'Trip was successfully destroyed.' }
      end
    end
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
