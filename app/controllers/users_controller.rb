class UsersController < ApplicationController
before_action :authenticate_user!

  def profile
    @trips = current_user.trips
    @requests = current_user.requests
    @requested_trips = @requests.map(&:trip)
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :bio, :phone_number)
    end

end
