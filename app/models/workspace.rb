class Workspace < ApplicationRecord
  validates :name, :url, presence: true

  before_save :add_owner_as_member
  # must do before save and not after_initialize or else you get a weird error about associationTypeMismatch: user execpted, got nil.

  after_initialize :ensure_unique_url

  belongs_to :owner,
    foreign_key: :owner_id,
    class_name: :User

  has_many :subscriptions, as: :subscribeable

  has_many :members,
    through: :subscriptions,
    source: :user

  def add_owner_as_member
    self.members << self.owner if self.new_record?
  end

  def ensure_unique_url
    self.url = loop do
      new_url = "#{self.name}-#{SecureRandom.urlsafe_base64(5)}.relay.herokuapp"
      break new_url unless self.class.exists?(url: new_url)
    end
  end
end
