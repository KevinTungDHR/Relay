class CreateChannels < ActiveRecord::Migration[5.2]
  def change
    create_table :channels do |t|
      t.string :name, null: false, index: true
      t.string :description, null: false
      t.integer :admin_id, null: false, index: true
      t.integer :workspace_id, null: false, index: true
      t.boolean :public, null: false, default: true

      t.timestamps
    end
  end
end
