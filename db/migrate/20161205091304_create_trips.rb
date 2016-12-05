class CreateTrips < ActiveRecord::Migration[5.0]
  def change
    create_table :trips do |t|
      t.string :level
      t.string :type
      t.string :origin
      t.string :destination
      t.datetime :start_date
      t.datetime :finish_date
      t.integer :max_users
      t.integer :space_material
      t.string :description
      t.timestamps
    end
  end
end
