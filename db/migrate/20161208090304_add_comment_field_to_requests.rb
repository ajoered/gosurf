class AddCommentFieldToRequests < ActiveRecord::Migration[5.0]
  def change
    add_column :requests, :comment, :string
  end
end
