class RemoveGroupFromChannelsAddGroupToDms < ActiveRecord::Migration[5.2]
  def change
    remove_column :channels, :is_group
    add_column :direct_messages, :is_group, :boolean, default: false, null: false

  end
end
