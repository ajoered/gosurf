class AddOwnerToTrips < ActiveRecord::Migration[5.0]
  def change
    add_reference :trips, :owner, references: :users
  end
end
