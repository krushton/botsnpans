class RobotPartsController < ApplicationController
  before_filter :authenticate_user!
# Get all of the robot parts.
# GET /robot_parts
# GET /robot_parts.json
  def index
  	@robot_parts = RobotPart.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @robot_parts }
    end
  end

  # Create a new robot part. This will be used by administrators.
  # GET /robot_parts/new
  # GET /robot_parts/new.json
  def new
    @robot_part = RobotPart.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @robot_part }
    end
  end

  # Edit an existing robot_part. This will be used by administrators.
  # GET /robot_parts/1/edit
  def edit
    @robot_part = RobotPart.find(params[:id])
  end

  # Create new robot part
  # POST /robot_parts
  # POST /robot_parts.json
  def create
    @robot_part = RobotPart.new(params[:robot_part])

    respond_to do |format|
      if @robot_part.save
        format.html { redirect_to @robot_part, notice: 'Part was successfully created.' }
        format.json { render json: @robot_part, status: :created, location: @robot_part }
      else
        format.html { render action: "new" }
        format.json { render json: @robot_part.errors, status: :unprocessable_entity }
      end
    end
  end

  # Update robot part
  # PUT /robot_parts/1
  # PUT /robot_parts/1.json
  def update
    @robot_part = RobotPart.find(params[:id])

    respond_to do |format|
      if @robot_part.update_attributes(params[:robot_part])
        format.html { redirect_to @robot_part, notice: 'Part was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @robot_part.errors, status: :unprocessable_entity }
      end
    end
  end

  # Remove robot part
  # DELETE /robot_parts/1
  # DELETE /robot_parts/1.json
  def destroy
    @robot_part = RobotPart.find(params[:id])
    @robot_part.destroy

    respond_to do |format|
      format.html { redirect_to robot_parts_url }
      format.json { head :no_content }
    end
  end
end

