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

  def self.getExistingDM(ids)
    self.joins(:subscriptions)
      .where(subscriptions: { user_id: ids } )
      .group(:id)
      .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
      .first
  end

  def only_two_members
    if self.members.length > 2
      errors.add(:members, " length can't be greater than 2")
    end
  end

  def add_members
    @user_ids.each do |user_id|
      user = User.find(user_id)
      self.members << user unless self.members.include?(user)
    end
  end
end
