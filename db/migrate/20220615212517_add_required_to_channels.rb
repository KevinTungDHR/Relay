class AddRequiredToChannels < ActiveRecord::Migration[5.2]
  def change
    add_column :channels, :required, :boolean, null: false, default: false
  end
end
