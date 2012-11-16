# == Schema Information
#
# Table name: robot_parts
#
#  id         :integer          not null, primary key
#  image_url  :string(255)
#  part_type  :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer
#

require 'test_helper'

class RobotPartTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
