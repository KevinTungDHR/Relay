class ChangeWorkplacesToWorkspaces < ActiveRecord::Migration[5.2]
  def change
    rename_table :workplaces, :workspaces
  end
end
