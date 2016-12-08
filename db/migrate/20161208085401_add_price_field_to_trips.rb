class AddPriceFieldToTrips < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :price, :integer
  end
end
