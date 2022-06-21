class AddClosedToDirectMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :direct_messages, :closed, :boolean, null: false, default: false
  end
end
