class ChangePendingDefaultFalse < ActiveRecord::Migration[5.2]
  def change
    change_column_default :subscriptions, :pending, false
  end
end
