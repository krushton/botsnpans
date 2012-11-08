class Game < ActiveRecord::Base
	has_many :level_data_items
	belongs_to :user
end
