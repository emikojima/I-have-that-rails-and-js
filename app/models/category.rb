class Category < ApplicationRecord
  has_many :items
  has_many :users, through: :items
  default_scope -> { order('name ASC') }
  validates :description, presence: true
  validates :name, presence: true, uniqueness: { case_sensitive: false }
end
