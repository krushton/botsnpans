class RenameRobotPartTypeColumn < ActiveRecord::Migration
def self.up
    rename_column :robot_parts, :type, :part_type
  end

  def self.down
    # rename back if you need or do something else or do nothing
  end
end
