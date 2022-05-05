class RemoveDirectMessageGroup < ActiveRecord::Migration[5.2]
  def change
    remove_column :direct_messages, :group
  end
end
