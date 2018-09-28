class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :available, :user_id, :user 
  belongs_to :user
  belongs_to :category, optional: true
end
