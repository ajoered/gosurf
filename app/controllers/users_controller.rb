class UsersController < ApplicationController

  def profile
    @user = current_user
    render 'users/profile'
  end
end
