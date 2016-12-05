class AddDefaultValueToStatusRequest < ActiveRecord::Migration[5.0]
  def change
    change_column :requests, :status, :boolean, :default => false
  end
end
