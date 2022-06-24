class Workspace < ApplicationRecord
  validates :name, :url, presence: true
  validates :url, uniqueness: true

  before_save :add_owner_as_member, if: :new_record?
  # must do before save and not after_initialize or else you get a weird error about associationTypeMismatch: user execpted, got nil.

  after_initialize :ensure_unique_url, if: :new_record?
  before_save :append_url_suffix

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :subscriptions, 
    -> {where( pending: false )},
    as: :subscribeable, dependent: :destroy

  has_many :pending_subscriptions, 
    -> {where( pending: true )},
    as: :subscribeable,
    class_name: :Subscription,
    dependent: :destroy

  has_many :members,
    through: :subscriptions,
    source: :user

  has_many :invited_users,
    through: :pending_subscriptions,
    source: :user

  has_many :channels,
    foreign_key: :workspace_id,
    class_name: :Channel

  def self.generate_workspace
    Workspace.new(name: "New Workspace")
  end

  def add_owner_as_member
    self.members << self.owner
  end

  def append_url_suffix
    self.url = "#{self.url}.relay.herokuapp" unless self.url.nil? || self.url =~ /.relay\.herokuapp$/
  end

  def ensure_unique_url
    self.url ||= loop do
      new_url = "#{self.name}-#{SecureRandom.urlsafe_base64(5)}.relay.herokuapp"
      break new_url unless self.class.exists?(url: new_url)
    end
  end

  def self.with_all_info
    includes(:subscriptions, :members)
  end

  def self.only_signedin
    includes(:subscriptions).where(subscriptions: { connected: true })
  end

  def self.search_channels(query)
    self.includes(:channels)
      .where("lower(channels.name) LIKE :query", query: "%#{query.downcase}%")
      .where("channels.public = true")
      .references(:channels)
  end

  def self.search_members(query)
    self.includes(:members)
      .where("lower(users.display_name) LIKE :query OR lower(users.email) LIKE :email", query: "#{query.downcase}%", email: "#{query.downcase}%@")
      .references(:members)
  end

  def add_new_member(user)
    self.members << user
    req_channels = self.channels.where(required: true)
    req_channels.each { |channel| channel.members << user }
  end

  def invite_users(users)
    invited = []
    
    users.each do |user|
      next if self.invited_users.include?(user) || self.members.include?(user)
      self.invited_users << user
      invited << user
    end

    return invited
  end 


  # def self.workspace_details(user_id, workspace_id)
  #   where(id: workspace_id)
  #   .includes(channels: [:members])

  #   .where(channels: { subscriptions: { user_id: user_id } })
    
  # end
  
  # def self.workspace_details(user_id, workspace_id)
  #   Workspace.where(id: workspace_id)
  #   .includes(members: :subscriptions)
  #   .where(subscriptions: { user_id: user_id })
  #   .includes(channels: :members)
  #   .where(channels: { workspace_id: workspace_id })
  # end


end
