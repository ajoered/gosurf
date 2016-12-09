class ChangeColumnName < ActiveRecord::Migration[5.0]
  def change
    rename_column :trips, :latitude, :origin_lat
    rename_column :trips, :longitude, :origin_lng
  end
end
