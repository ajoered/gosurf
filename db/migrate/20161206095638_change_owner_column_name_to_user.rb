class ChangeOwnerColumnNameToUser < ActiveRecord::Migration[5.0]
  def change
    rename_column :trips, :owner_id, :user_id
  end
end
