class UsersController < ApplicationController
  before_filter :authenticate_user!, :verify_admin

  # Administrators only
  # GET /users/all
  def all
  	@users = User.all
  end

  # GET /users/show
  def show
  	@user = current_user
  end

  # DELETE /users/destroy/1
  def destroy
    User.find(params[:id]).destroy
    redirect_to users_all_path
  end

  private
 
  def verify_admin
    unless current_user.admin?
      flash[:error] = "You are not authorized to do this."
    end
  end


end

