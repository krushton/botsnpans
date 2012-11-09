class LevelDataItemsController < ApplicationController
  before_filter :authenticate_user!
  # return the level data list for the logged in user
  # GET /level_data_items
  # GET /level_data_items.json
  def index
    @level_data_items = LevelDataItem(:user_id => current_user)

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @level_data_items }
    end
  end


  # create a new level data item after a user finishes a level
  # POST /level_data_items/create
  def create
    @level_data_item = LevelDataItem.new(params[:level_data_item])

    respond_to do |format|
      if @level_data_item
        format.json { render json: @level_data_item, status: :created, location: @level_data_item }
      else
        format.json { render json: @level.errors, status: :unprocessable_entity }
      end
    end
  end

  # allow level data to be updated after the user replays the level
  # PUT /level_data_items/1
  # PUT /level_data_items/1.json
  def update
    @level_data_item = LevelDataItem.find(params[:id])

    respond_to do |format|
      if @level_data_item.update_attributes(params[:level_data_item])
        format.json { head :no_content }
      else
        format.json { render json: @level_data_item.errors, status: :unprocessable_entity }
      end
    end
  end

end
