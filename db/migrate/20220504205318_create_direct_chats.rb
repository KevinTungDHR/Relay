class CreateDirectChats < ActiveRecord::Migration[5.2]
  def change
    create_table :direct_chats do |t|
      t.integer :workspace_id, null: false, index: true
      t.boolean :group, null: false, default: false

      t.timestamps
    end
  end
end
