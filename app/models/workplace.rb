class Workplace < ApplicationRecord
  validates :name, :url, presence: true
  
  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :subscriptions, as: :subscribeable

  has_many :members,
    through: :subscriptions,
    source: :user
end
