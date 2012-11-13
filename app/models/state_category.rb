# == Schema Information
#
# Table name: state_categories
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class StateCategory < ActiveRecord::Base
	has_many :states
end
