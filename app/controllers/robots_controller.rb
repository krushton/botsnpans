class RobotsController < ApplicationController
  before_filter :authenticate_user!
  # get the logged in user's robot
  # GET /robot
  def show
  	@robot = current_user.robot
  end

  # send out all of the data needed to create a new robot (list of robot parts)
  # GET /robots/new
  # GET /robots/new.json
  def new
    @robot = Robot.new
    @parts = RobotPart.all

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @robot }
    end
  end

  def edit
    @robot = current_user.robot
    @parts = RobotPart.all
  end

  # create a new robot for the logged in user
  # POST /robots
  def create
    @robot = Robot.new(params[:robot])
    @robot.user = current_user

    respond_to do |format|
      if @robot
        format.json { render json: @robot, status: :created, location: @robot }
      else
        format.json { render json: @robot.errors, status: :unprocessable_entity }
      end
    end
  end

  # update the user's robot
  # PUT /robots
  def update
    @robot = LevelDataItem.find(params[:id])

    respond_to do |format|
      if @robot.update_attributes(params[:robot])
        format.json { head :no_content }
      else
        format.json { render json: @robot.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /robots/1
  # DELETE /robots/1.json
  def destroy
    @robot = Robot.find(params[:id])
    @robot.destroy

    respond_to do |format|
      format.html { redirect_to robot_url }
      format.json { head :no_content }
    end
  end

end
