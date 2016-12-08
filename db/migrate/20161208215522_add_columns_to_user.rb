class AddColumnsToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :level, :string
    add_column :users, :phone_number, :string
    add_column :users, :bio, :string
  end
end
