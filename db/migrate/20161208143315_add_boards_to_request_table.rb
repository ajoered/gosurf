class AddBoardsToRequestTable < ActiveRecord::Migration[5.0]
  def change
    add_column :requests, :boards, :integer
  end
end
