class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :available, :user_id
  belongs_to :user, serializer: ItemUserSerializer
  belongs_to :category, optional: true
end
