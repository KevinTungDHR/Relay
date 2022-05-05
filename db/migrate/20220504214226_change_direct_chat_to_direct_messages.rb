class ChangeDirectChatToDirectMessages < ActiveRecord::Migration[5.2]
  def change
    rename_table :direct_chats, :direct_messages
  end
end
