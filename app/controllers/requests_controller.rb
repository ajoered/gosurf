class RequestsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:approve]

  def approve
    @request = Request.find_by(id: params[:id])
    @request.approve!
  end

end
