# == Schema Information
#
# Table name: robot_parts
#
#  id         :integer          not null, primary key
#  image_url  :string(255)
#  type       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RobotPartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
