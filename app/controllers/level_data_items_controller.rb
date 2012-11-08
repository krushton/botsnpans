class LevelDataItemsController < ApplicationController
  # GET /level_data_items
  # GET /level_data_items.json
  def index
    @level_data_items = LevelDataItem.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @level_data_items }
    end
  end

  # GET /level_data_items/1
  # GET /level_data_items/1.json
  def show
    @level_data_item = LevelDataItem.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @level_data_item }
    end
  end

  # GET /level_data_items/new
  # GET /level_data_items/new.json
  def new
    @level_data_item = LevelDataItem.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @level_data_item }
    end
  end

  # GET /level_data_items/1/edit
  def edit
    @level_data_item = LevelDataItem.find(params[:id])
  end

  # POST /level_data_items
  # POST /level_data_items.json
  def create
    @level_data_item = LevelDataItem.new(params[:level_data_item])

    respond_to do |format|
      if @level_data_item.save
        format.html { redirect_to @level_data_item, notice: 'Level data item was successfully created.' }
        format.json { render json: @level_data_item, status: :created, location: @level_data_item }
      else
        format.html { render action: "new" }
        format.json { render json: @level_data_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /level_data_items/1
  # PUT /level_data_items/1.json
  def update
    @level_data_item = LevelDataItem.find(params[:id])

    respond_to do |format|
      if @level_data_item.update_attributes(params[:level_data_item])
        format.html { redirect_to @level_data_item, notice: 'Level data item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @level_data_item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /level_data_items/1
  # DELETE /level_data_items/1.json
  def destroy
    @level_data_item = LevelDataItem.find(params[:id])
    @level_data_item.destroy

    respond_to do |format|
      format.html { redirect_to level_data_items_url }
      format.json { head :no_content }
    end
  end
end
