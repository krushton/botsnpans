class AdminFunctionsController < Devise::RegistrationsController
  before_filter :authenticate_user!
  # TODO: check role
  # Administrators only
  # GET /users/all
  def all
  	@users = User.all
  end

  # GET /users/show
  def show
  	@user = current_user
  end

  # DELETE /users/1
  def destroy
    User.find(params[:id]).destroy
    redirect_to users_all_path
  end
 
end
