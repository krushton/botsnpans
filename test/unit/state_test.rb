# == Schema Information
#
# Table name: states
#
#  id                :integer          not null, primary key
#  name              :string(255)
#  image_url         :string(255)
#  position          :integer
#  state_category_id :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  state_before_id   :integer
#  state_after_id    :integer
#

require 'test_helper'

class StateTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
