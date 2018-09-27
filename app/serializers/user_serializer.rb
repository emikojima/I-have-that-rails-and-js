class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :city, :state
  has_many :items, dependent: :destroy
  has_many :categories, through: :items
end
