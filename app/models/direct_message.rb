class DirectMessage < ApplicationRecord
  validates :group, inclusion: { in: [true, false] }
  validate :only_two_members
  before_save :add_members, if: :new_record?

  has_many :messages, as: :messageable, dependent: :destroy
  has_many :subscriptions, as: :subscribeable, dependent: :destroy

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  has_many :members,
    through: :subscriptions,
    source: :user

  attr_reader :user_ids

  def user_ids=(user_ids)
    @user_ids = user_ids.instance_of?(String) ? JSON.parse(user_ids) : user_ids
  end 

  def only_two_members
    if self.members.length > 2
      errors.add(:members, " length can't be greater than 2")
    end
  end
end
