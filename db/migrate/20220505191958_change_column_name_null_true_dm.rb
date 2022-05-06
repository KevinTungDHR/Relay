class ChangeColumnNameNullTrueDm < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:direct_messages, :name, true)
  end
end
