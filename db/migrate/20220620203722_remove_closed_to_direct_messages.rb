class RemoveClosedToDirectMessages < ActiveRecord::Migration[5.2]
  def change
    remove_column :direct_messages, :closed
  end
end
