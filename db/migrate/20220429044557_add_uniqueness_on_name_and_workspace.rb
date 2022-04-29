class AddUniquenessOnNameAndWorkspace < ActiveRecord::Migration[5.2]
  def change
    add_index :channels, [:workspace_id, :name], unique: true
  end
end
