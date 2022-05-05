class DirectMessage < ApplicationRecord
  validates :group, inclusion: { in: [true, false] }

  before_save :add_members, :check_if_group, if: :new_record?

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

  def add_members
    @user_ids.each do |user_id|
      user = User.find(user_id)
      self.members << user unless self.members.include?(user)
    end
  end

  def self.getExistingGroup(ids)
    self.joins(:subscriptions)
      .where(subscriptions: { user_id: ids } )
      .group(:id)
      .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
      .first
  end

  def check_if_group
    if self.members.length > 2
      self.group = true
    end
  end
end
