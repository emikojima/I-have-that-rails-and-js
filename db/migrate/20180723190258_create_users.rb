class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :email
      t.string :street
      t.string :city
      t.string :state
      t.string :country, default: "USA"
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
