class CreateLevelDataItems < ActiveRecord::Migration
  def change
    create_table :level_data_items do |t|
      t.integer :level_id
      t.integer :game_id
      t.boolean :completed
      t.datetime :date_completed

      t.timestamps
    end
  end
end
