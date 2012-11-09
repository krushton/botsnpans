# == Schema Information
#
# Table name: robot_parts
#
#  id         :integer          not null, primary key
#  image_url  :string(255)
#  part_type  :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class RobotPart < ActiveRecord::Base
	attr_accessible :image_url, :part_type
end
