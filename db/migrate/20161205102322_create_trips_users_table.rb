class CreateTripsUsersTable < ActiveRecord::Migration[5.0]
  def change
    create_table :trips_users do |t|
      t.references :user, foreign_key: true
      t.references :trip, foreign_key: true
    end
  end
end
