class RobotsRobotparts < ActiveRecord::Migration
  def up
  	create_table "robot_parts_robots", :id => false do |t|
    t.integer "robot_id"
    t.integer "robot_part_id"
	end
  end

  def down
  end
end

