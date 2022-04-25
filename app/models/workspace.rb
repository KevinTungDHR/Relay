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

  has_many :subscriptions, as: :subscribeable

  has_many :members,
    through: :subscriptions,
    source: :user

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
end
