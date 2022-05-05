class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :workspace_id }, if: -> { !is_group }
  validates :description, presence: true, allow_blank: true
  validates :public, inclusion: { in: [true, false]}
  
  validate :group_smaller_than_nine, :private_if_group
  before_save :ensure_name
  before_save :add_members, if: :new_record?

  before_save :ensure_admin_in_workspace, if: :new_record?
  after_initialize :ensure_description

  belongs_to :admin,
    foreign_key: :admin_id,
    class_name: :User,
    optional: true

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  has_many :subscriptions, as: :subscribeable, dependent: :destroy

  has_many :members,
    through: :subscriptions,
    source: :user

  has_many :messages, as: :messageable, dependent: :destroy

    
  def ensure_name
    return unless self.is_group

    if self.members.length < 3
      self.name = self.members[0,3].map(&:display_name).join(', ')
    else
      self.name = "#{self.members[0,2].map(&:display_name).join(', ')} and #{self.members.length - 2} others"
    end

    self.save!
  end

  def ensure_description
    self.description ||= ""
  end

  def ensure_admin_in_workspace
    if !self.is_group
      raise "User not part of workspace" unless Workspace.find(self.workspace_id).members.exists?(self.admin.id)
    end
  end


  # group methods
  def self.getExistingGroup(ids)
    self.joins(:subscriptions)
      .where(subscriptions: { user_id: ids } )
      .group(:id)
      .having('count(direct_messages.id) = :ids_length', ids_length: ids.length)
      .first
  end

  def group_smaller_than_nine
    if self.is_group && self.members.length > 9
      errors.add(:members, " length can't be greater than 9")
    end
  end

  def private_if_group
    if self.is_group
      self.public = false
    end
  end

  attr_reader :user_ids

  def user_ids=(user_ids)
    @user_ids = user_ids.instance_of?(String) ? JSON.parse(user_ids) : user_ids
  end 

  def add_members
    if self.is_group
      @user_ids.each do |user_id|
        user = User.find(user_id)
        self.members << user unless self.members.include?(user)
      end
    end
  end
end
