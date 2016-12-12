class ChangeColumnNameCountryToCountryOrigin < ActiveRecord::Migration[5.0]
  def change
    rename_column :trips, :country, :country_origin
  end
end
