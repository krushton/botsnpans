# app/controllers/registrations_controller.rb
class RegistrationsController < Devise::RegistrationsController
  def new
    super
  end

  def create
    @user = User.new(params[:user])
    @user.robot = Robot.new

    respond_to do |format|
      if @user.save
        flash[:notice] = "New user added"
        format.html { redirect_to root_url }
        format.json { render json: @user, status: :created, location: @user }
      else
        format.html { render action: "new" }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    super
  end
end 
