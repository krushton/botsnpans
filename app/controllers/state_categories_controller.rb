class StateCategoriesController < ApplicationController
  # GET /state_categories
  # GET /state_categories.json
  def index
    @state_categories = StateCategory.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @state_categories }
    end
  end

  # GET /state_categories/1
  # GET /state_categories/1.json
  def show
    @state_category = StateCategory.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @state_category }
    end
  end

  # GET /state_categories/new
  # GET /state_categories/new.json
  def new
    @state_category = StateCategory.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @state_category }
    end
  end

  # GET /state_categories/1/edit
  def edit
    @state_category = StateCategory.find(params[:id])
  end

  # POST /state_categories
  # POST /state_categories.json
  def create
    @state_category = StateCategory.new(params[:state_category])

    respond_to do |format|
      if @state_category.save
        format.html { redirect_to @state_category, notice: 'State category was successfully created.' }
        format.json { render json: @state_category, status: :created, location: @state_category }
      else
        format.html { render action: "new" }
        format.json { render json: @state_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /state_categories/1
  # PUT /state_categories/1.json
  def update
    @state_category = StateCategory.find(params[:id])

    respond_to do |format|
      if @state_category.update_attributes(params[:state_category])
        format.html { redirect_to @state_category, notice: 'State category was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @state_category.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /state_categories/1
  # DELETE /state_categories/1.json
  def destroy
    @state_category = StateCategory.find(params[:id])
    @state_category.destroy

    respond_to do |format|
      format.html { redirect_to state_categories_url }
      format.json { head :no_content }
    end
  end
end
