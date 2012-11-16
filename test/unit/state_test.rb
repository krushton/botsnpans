# == Schema Information
#
# Table name: states
#
#  id                     :integer          not null, primary key
#  name                   :string(255)
#  image_url              :string(255)
#  position               :integer
#  state_category_id      :integer
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_parent_state_id  :integer
#  second_parent_state_id :integer
#

require 'test_helper'

class StateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
