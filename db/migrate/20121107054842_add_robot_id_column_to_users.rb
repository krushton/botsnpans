class AddRobotIdColumnToUsers < ActiveRecord::Migration
  def change
	add_column :users, :robot_id, :integer  
  end
end
