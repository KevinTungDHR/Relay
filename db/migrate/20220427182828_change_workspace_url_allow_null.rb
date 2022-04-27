class ChangeWorkspaceUrlAllowNull < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:workspaces, :url, true)
  end
end
