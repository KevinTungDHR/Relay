class CreateWorkplaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workplaces do |t|
      t.string :name, null: false
      t.string :url, null: false, index: { unique: true }
      t.integer :owner_id, null: false

      t.timestamps
    end
  end
end
