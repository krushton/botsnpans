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
	before_save :default_values
	belongs_to :user
	has_and_belongs_to_many :robot_parts
	attr_accessible :name


  def default_values
    self.name ||= 'Chefbot'
    [3,1,8,5,7].each do |id|
    	part = RobotParts.find(id)
    	self.robot_parts << part
    end
  end
end