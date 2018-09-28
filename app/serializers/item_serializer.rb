class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :available, :user 
  belongs_to :user
  belongs_to :category, optional: true
end
