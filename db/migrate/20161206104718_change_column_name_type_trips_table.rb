class ChangeColumnNameTypeTripsTable < ActiveRecord::Migration[5.0]
  def change
    rename_column :trips, :type, :kind_of_trip
  end
end
