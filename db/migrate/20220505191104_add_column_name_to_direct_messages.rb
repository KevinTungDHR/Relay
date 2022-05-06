class AddColumnNameToDirectMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :direct_messages, :name, :string, null: false
  end
end
