require 'test_helper'

class LevelDataItemsControllerTest < ActionController::TestCase
  setup do
    @level_data_item = level_data_items(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:level_data_items)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create level_data_item" do
    assert_difference('LevelDataItem.count') do
      post :create, level_data_item: @level_data_item.attributes
    end

    assert_redirected_to level_data_item_path(assigns(:level_data_item))
  end

  test "should show level_data_item" do
    get :show, id: @level_data_item
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @level_data_item
    assert_response :success
  end

  test "should update level_data_item" do
    put :update, id: @level_data_item, level_data_item: @level_data_item.attributes
    assert_redirected_to level_data_item_path(assigns(:level_data_item))
  end

  test "should destroy level_data_item" do
    assert_difference('LevelDataItem.count', -1) do
      delete :destroy, id: @level_data_item
    end

    assert_redirected_to level_data_items_path
  end
end
