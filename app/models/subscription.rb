class Subscription < ApplicationRecord
  validates :user_id, uniqueness: { scope: [:subscribeable_id, :subscribeable_type] }
  validates :pending, :connected, inclusion: { in: [true, false] }
  
  belongs_to :subscribeable, polymorphic: true
  
  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  # Someone online helped me figure out explicit associations
  # Save does not like this because it doesn't exist yet. similar to the tagging problem
  # belongs_to :channel,
  #   -> { where(subscriptions: {
  #          subscribeable_type: 'Channel'
  #        }) },
  #   foreign_key: :subscribeable_id

  # belongs_to :workspace,
  #   -> { where(subscriptions: {
  #          subscribeable_type: 'Workspace'
  #        }) },
  #   foreign_key: :subscribeable_id

end
