class ChangeWorkspaceUrlDontAllowNil < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:workspaces, :url, false)
  end
end
