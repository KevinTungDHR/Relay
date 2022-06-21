class AddCreatorToDirectMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :direct_messages, :creator_id, :integer

    DirectMessage.update_all(creator_id: 1030)

    change_column_null :direct_messages, :creator_id, false
  end
end
