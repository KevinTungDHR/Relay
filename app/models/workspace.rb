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

  has_many :subscriptions, as: :subscribeable, dependent: :destroy

  has_many :members,
    through: :subscriptions,
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
    includes(:subscriptions).where(subscriptions: { signed_in: true })
  end

  def self.search_channels(query)
    self.includes(:channels)
      .where("lower(channels.name) LIKE :query", query: "%#{query.downcase}%")
      .references(:channels)
  end

  def self.search_members(query)
    self.includes(:members)
      .where("lower(users.display_name) LIKE :query OR lower(users.email) LIKE :query", query: "%#{query.downcase}%")
      .references(:members)
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
