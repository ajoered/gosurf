class ApplicationController < ActionController::Base
  unless Rails.env.developtment?
    protect_from_forgery with: :exception
  end

  before_action :configure_permitted_parameters, if: :devise_controller?

protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :email, :level, :bio, :phone_number])
  end
end
