class AddColumnCountryDestination < ActiveRecord::Migration[5.0]
  def change
    add_column :trips, :country_destination, :string
  end
end
