class LevelsController < ApplicationController
  # Gets a list of all the levels in the game
  # GET /levels
  # GET /levels.json
  def index
    @levels = Level.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @levels }
    end
  end

  # Recipe Book!
  # GET /levels/recipebook
  # GET /levels/1.json
  def recipebook
    @levels = Level.all

    respond_to do |format|
      format.html # recipebook.html.erb
      format.json { render json: @levels }
    end
  end

  # Get the game screen for a particular level. 
  # GET /game/id
  def game
    @level = Level.find(params[:id])

    @items = []
    @tools = []
    State.all.each do |state| 
      if state.state_category.name == "Tools"
        @tools << state
      else
        @items << state
      end
    end

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @level }
    end
  end

  # Create a new level. This will be used by administrators.
  # GET /levels/new
  # GET /levels/new.json
  def new
    @level = Level.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @level }
    end
  end

  # Edit an existing level. This will be used by administrators.
  # GET /levels/1/edit
  def edit
    @level = Level.find(params[:id])
  end

  # POST /levels
  # POST /levels.json
  def create
    @level = Level.new(params[:level])

    respond_to do |format|
      if @level.save
        format.html { redirect_to @level, notice: 'Level was successfully created.' }
        format.json { render json: @level, status: :created, location: @level }
      else
        format.html { render action: "new" }
        format.json { render json: @level.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /levels/1
  # PUT /levels/1.json
  def update
    @level = Level.find(params[:id])

    respond_to do |format|
      if @level.update_attributes(params[:level])
        format.html { redirect_to @level, notice: 'Level was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @level.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /levels/1
  # DELETE /levels/1.json
  def destroy
    @level = Level.find(params[:id])
    @level.destroy

    respond_to do |format|
      format.html { redirect_to levels_url }
      format.json { head :no_content }
    end
  end
end
