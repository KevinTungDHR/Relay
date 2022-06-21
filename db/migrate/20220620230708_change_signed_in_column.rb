class ChangeSignedInColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :subscriptions, :signed_in, :connected
  end
end
