class CreateRequests < ActiveRecord::Migration[5.0]
  def change
    create_table :requests do |t|
      t.integer  "trip_id"
      t.integer  "user_id"
      t.boolean :status
      t.timestamps
    end
  end
end
