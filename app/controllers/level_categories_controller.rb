class LevelCategoriesController < ApplicationController
  # GET /level_categories
  # GET /level_categories.json
  def index
    @level_categories = LevelCategory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @level_categories }
    end
  end

  # GET /level_categories/1
  # GET /level_categories/1.json
  def show
    @level_category = LevelCategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @level_category }
    end
  end

  # GET /level_categories/new
  # GET /level_categories/new.json
  def new
    @level_category = LevelCategory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @level_category }
    end
  end

  # GET /level_categories/1/edit
  def edit
    @level_category = LevelCategory.find(params[:id])
  end

  # POST /level_categories
  # POST /level_categories.json
  def create
    @level_category = LevelCategory.new(params[:level_category])

    respond_to do |format|
      if @level_category.save
        format.html { redirect_to @level_category, notice: 'Level category was successfully created.' }
        format.json { render json: @level_category, status: :created, location: @level_category }
      else
        format.html { render action: "new" }
        format.json { render json: @level_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /level_categories/1
  # PUT /level_categories/1.json
  def update
    @level_category = LevelCategory.find(params[:id])

    respond_to do |format|
      if @level_category.update_attributes(params[:level_category])
        format.html { redirect_to @level_category, notice: 'Level category was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @level_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /level_categories/1
  # DELETE /level_categories/1.json
  def destroy
    @level_category = LevelCategory.find(params[:id])
    @level_category.destroy

    respond_to do |format|
      format.html { redirect_to level_categories_url }
      format.json { head :no_content }
    end
  end
end
