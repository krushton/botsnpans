class RenameStateIdColumns < ActiveRecord::Migration
 def self.up
    rename_column :states, :state_before_id, :first_parent_state_id
    rename_column :states, :state_after_id, :second_parent_state_id
  end

  def self.down
    # rename back if you need or do something else or do nothing
  end
end


