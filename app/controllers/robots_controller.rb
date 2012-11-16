class RobotsController < ApplicationController
  before_filter :authenticate_user!

  def edit
    @robot = current_user.robot.nil? ? Robot.find(1) : current_user.robot
    @heads = RobotPart.where("part_type = ?", "head")
    @torsos = RobotPart.where("part_type = ?", "body")
    @arms = RobotPart.where("part_type = ? or part_type = ?", "leftarm", "rightarm")
    @legs = RobotPart.where("part_type = ?", "legs")
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
