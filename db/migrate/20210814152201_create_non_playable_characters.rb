class CreateNonPlayableCharacters < ActiveRecord::Migration[6.1]
  def change
    create_table :non_playable_characters do |t|
      t.string :first_name
      t.string :last_name
      t.string :city
      t.string :race
      t.string :weapon

      t.timestamps
    end
  end
end
