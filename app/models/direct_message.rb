class DirectMessage < ApplicationRecord
  validates :is_group, inclusion: { in: [true, false] }

  before_save :add_creator_as_member, :add_members, :check_if_group, if: :new_record?

  has_many :messages, as: :messageable, dependent: :destroy
  has_many :subscriptions, as: :subscribeable, dependent: :destroy

  # before_save :ensure_name

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  belongs_to :creator,
    foreign_key: :creator_id,
    class_name: :User

  has_many :members,
    through: :subscriptions,
    source: :user

  attr_reader :user_ids

  def user_ids=(user_ids)
    @user_ids = user_ids.instance_of?(String) ? JSON.parse(user_ids) : user_ids
  end 

  # def ensure_name
  #   return unless self.is_group
  
  #   if self.members.length < 3
  #     self.name = self.members[0,3].map(&:display_name).join(', ')
  #   else
  #     self.name = "#{self.members[0,2].map(&:display_name).join(', ')} and #{self.members.length - 2} others"
  #   end
  # end

  def add_creator_as_member
    self.members << self.creator
  end

  
  def add_members
    @user_ids.each do |user_id|
      user = User.find(user_id)
      self.members << user unless self.members.include?(user)
    end
  end

  def self.getExistingGroup(workspace_id, ids)
    subQuery = self.joins(:subscriptions)
      .where(subscriptions: { user_id: ids } )
      .where(workspace_id: workspace_id)
      .group(:id)
      .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
      .select("direct_messages.*")
    
    sorted_ids = ids.sort
    subQuery.each do |group|
      groupIds = group.members.map { |member| member.id}.sort
      return group if groupIds == sorted_ids
    end

    return nil
  end

  # def with_ids(ids)
  #   sorted_ids = ids.sort
  #   self.direct_messages.find do |dm| 
  #     mem_ids = dm.members.map { |mem| mem.id }
  #     mem_ids.sort! == sorted_ids  
  #   end
  # end

  def self.checkExists(ids)
    self.joins('INNER JOIN subscriptions AS subs ON subs.subscribeable_id = direct_messages.id')
      .where(subscriptions: { user_id: ids } )
      # .group(:id)
      # .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
      # .first
  end

  def check_if_group
    if self.members.length > 2
      self.is_group = true
    end
  end
end
