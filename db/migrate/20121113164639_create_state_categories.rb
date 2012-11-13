class CreateStateCategories < ActiveRecord::Migration
  def change
    create_table :state_categories do |t|
      t.string :name

      t.timestamps
    end
  end
end
