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
	has_and_belongs_to_many :robots

	def position
		case (part_type)
		when "head"
			return 1
		when "leftharm"
			return 2
		when "body"
			return 3
		when "rightarm"
			return 4
		when "legs"
			return 5
		end
	end
end
