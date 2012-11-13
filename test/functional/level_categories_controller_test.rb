require 'test_helper'

class LevelCategoriesControllerTest < ActionController::TestCase
  setup do
    @level_category = level_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:level_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create level_category" do
    assert_difference('LevelCategory.count') do
      post :create, level_category: @level_category.attributes
    end

    assert_redirected_to level_category_path(assigns(:level_category))
  end

  test "should show level_category" do
    get :show, id: @level_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @level_category
    assert_response :success
  end

  test "should update level_category" do
    put :update, id: @level_category, level_category: @level_category.attributes
    assert_redirected_to level_category_path(assigns(:level_category))
  end

  test "should destroy level_category" do
    assert_difference('LevelCategory.count', -1) do
      delete :destroy, id: @level_category
    end

    assert_redirected_to level_categories_path
  end
end
