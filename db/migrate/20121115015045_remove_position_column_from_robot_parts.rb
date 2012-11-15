class RemovePositionColumnFromRobotParts < ActiveRecord::Migration
  def up
  def change
  	remove_column :robot_parts, :position
  end
  end

  def down
  end
end
