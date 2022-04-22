class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      login(@user)
      render :show
    else
      render json: ['Invalid Username/Password Combination'], status: 401
    end
  end

  def destroy
    if logged_in?
      logout!
      render json: {}
    else
      head 404
    end
  end
end
