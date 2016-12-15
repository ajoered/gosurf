class ChangeStartDateAndFinishDateFromDatetimeToDate < ActiveRecord::Migration[5.0]
  def change
    change_column :trips, :start_date, :date
    change_column :trips, :finish_date, :date
  end
end
