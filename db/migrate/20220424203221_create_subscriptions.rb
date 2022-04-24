class CreateSubscriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.boolean :pending, null: false, default: true
      t.boolean :signed_in, null: false, default: true
      t.references :subscribeable, polymorphic: true, index: { name: 'subscription_id_and_subscription_type'}

      t.timestamps
    end

    add_index :subscriptions, [:user_id, :subscribeable_id, :subscribeable_type], unique: true, name: 'unique_user_subscription'
  end
end
