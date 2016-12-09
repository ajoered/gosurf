class AddColumnsDestlatAndDestlonToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :destination_lat, :float
    add_column :trips, :destination_lng, :float
  end
end
