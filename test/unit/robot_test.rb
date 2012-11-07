# == Schema Information
#
# Table name: robots
#
#  id         :integer          not null, primary key
#  user_id    :integer
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class RobotTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
