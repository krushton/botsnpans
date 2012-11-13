class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :name
      t.string :image_url
      t.integer :position
      t.integer :state_category_id

      t.timestamps
    end
  end
end
