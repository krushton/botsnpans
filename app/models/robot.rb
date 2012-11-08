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

class Robot < ActiveRecord::Base
	belongs_to :user
	has_many :robot_parts
end
