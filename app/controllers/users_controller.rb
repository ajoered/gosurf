class UsersController < ApplicationController
before_action :authenticate_user!

  def profile
    @trips = current_user.trips
    render 'users/profile'
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email)
    end

end
