class AddIndexToWorkspacesOwnerId < ActiveRecord::Migration[5.2]
  def change
    add_index :workspaces, :owner_id
  end
end
