# == Schema Information
#
# Table name: level_data_items
#
#  id             :integer          not null, primary key
#  level_id       :integer
#  game_id        :integer
#  completed      :boolean
#  date_completed :datetime
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

require 'test_helper'

class LevelDataItemTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
