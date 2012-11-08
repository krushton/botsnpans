# == Schema Information
#
# Table name: levels
#
#  id                :integer          not null, primary key
#  name              :string(255)
#  final_state_id    :integer
#  description       :string(255)
#  level_category_id :string(255)
#  time_limit        :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#

require 'test_helper'

class LevelTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
