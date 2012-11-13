require 'test_helper'

class StateCategoriesControllerTest < ActionController::TestCase
  setup do
    @state_category = state_categories(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:state_categories)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create state_category" do
    assert_difference('StateCategory.count') do
      post :create, state_category: @state_category.attributes
    end

    assert_redirected_to state_category_path(assigns(:state_category))
  end

  test "should show state_category" do
    get :show, id: @state_category
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @state_category
    assert_response :success
  end

  test "should update state_category" do
    put :update, id: @state_category, state_category: @state_category.attributes
    assert_redirected_to state_category_path(assigns(:state_category))
  end

  test "should destroy state_category" do
    assert_difference('StateCategory.count', -1) do
      delete :destroy, id: @state_category
    end

    assert_redirected_to state_categories_path
  end
end
