class Item < ApplicationRecord
  has_many :reviews
  belongs_to :user
  belongs_to :category, optional: true
  default_scope -> { order('name ASC') }
  validates :name, presence: true
  validates :description, presence: true
  validates :category, presence: true

  def self.search_items(word)
    if word && !word.blank?
      @users = User.where(city: word.upcase)
      @users.map do |user|
      user.items
      end.flatten
    else
      Item.all
    end
  end

  

  def available?
    self.available == true ? "   This item is AVAILABLE!" : "   UNAVAILABLE. Please Check Back Later"
  end
  # Search to see if item is available Item.where(available: true)
end
