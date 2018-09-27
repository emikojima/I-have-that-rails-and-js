class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :available 
  belongs_to :user
  belongs_to :category, optional: true
end
