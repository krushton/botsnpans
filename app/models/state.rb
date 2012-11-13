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
#

class State < ActiveRecord::Base
	belongs_to :state_category
end
