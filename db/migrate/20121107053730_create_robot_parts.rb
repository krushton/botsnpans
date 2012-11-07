class CreateRobotParts < ActiveRecord::Migration
  def change
    create_table :robot_parts do |t|
      t.string :image_url
      t.string :type

      t.timestamps
    end
  end
end
