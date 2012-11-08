class CreateLevels < ActiveRecord::Migration
  def change
    create_table :levels do |t|
      t.string :name
      t.integer :final_state_id
      t.string :description
      t.string :level_category_id
      t.integer :time_limit

      t.timestamps
    end
  end
end
