class ChangeChannelsToIncludeGroups < ActiveRecord::Migration[5.2]
  def change
    change_column_null :channels, :admin_id, true
    add_column :channels, :is_group, :boolean, default: false, null: false
  end
end
