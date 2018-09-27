class User < ApplicationRecord
  has_secure_password

  has_many :items, dependent: :destroy
  has_many :categories, through: :items
  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: true
  default_scope -> { order('name ASC') }
  before_save { |user| user.city = city.upcase unless user.city == nil}
  before_update { |user| user.city = city.upcase unless user.city == nil}
  before_save { |user| user.state = state.upcase unless user.state == nil}
  before_update { |user| user.state = state.upcase unless user.state == nil }
  accepts_nested_attributes_for :items

  # geocoded_by :address
  # after_validation :geocode, if: => :address_changed?
  # after_validation :geocode, if: ->(obj){ obj.address.present? and obj.address_changed? }
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.email = auth.info.email
      user.password = user.password_confirmation = SecureRandom.urlsafe_base64(n=6)
      user.save!
    end
	end

  def address
  [street, city, state, country].compact.join(', ')
  end
end
