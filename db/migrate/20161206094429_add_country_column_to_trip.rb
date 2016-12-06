class AddCountryColumnToTrip < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :country, :string
  end
end
