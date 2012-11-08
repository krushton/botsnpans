class LevelDataItem < ActiveRecord::Base
	has_one :level
	belongs_to :game
end
