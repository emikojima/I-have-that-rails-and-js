class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :available, :user_id
  belongs_to :user, only: [:id, :name, :city, :state, :email]
  belongs_to :category, optional: true
end
