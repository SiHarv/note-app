class CreateNotes < ActiveRecord::Migration[8.1]
  def change
    create_table :notes do |t|
      t.text :note
      t.boolean :status

      t.timestamps
    end
  end
end
