class Subscription < ApplicationRecord
  validates :user_id, uniqueness: { scope: [:subscribeable_id, :subscribeable_type] }
  validates :pending, :signed_in, inclusion: { in: [true, false] }
  
  belongs_to :subscribeable, polymorphic: true
  
  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User
end
