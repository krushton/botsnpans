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

class State < ActiveRecord::Base
	belongs_to :state_category
	attr_accessible :name, :image_url, :position, :state_category_id, :first_parent_state_id, 
	:second_parent_state_id
end
