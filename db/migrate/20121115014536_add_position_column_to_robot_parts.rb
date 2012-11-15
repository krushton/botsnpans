class AddPositionColumnToRobotParts < ActiveRecord::Migration
  def change
  	add_column :robot_parts, :position, :integer  
  end
end
