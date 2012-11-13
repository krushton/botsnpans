class AddStateBeforeColumnToStates < ActiveRecord::Migration
  def change
  	add_column :states, :state_before_id, :integer
  	add_column :states, :state_after_id, :integer
  end
end
