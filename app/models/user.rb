class User < ApplicationRecord
  validates :email, :display_name, :password_digest, :session_token, presence: true
  validates :email, uniqueness: { case_sensitive: false }
  validates :session_token, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  after_initialize :ensure_session_token, :set_display_name
  attr_reader :password

  has_many :subscriptions,
    -> {where(pending: false)},
    foreign_key: :user_id,
    class_name: :Subscription,
    dependent: :destroy


  has_many :pending_subscriptions,
    -> {where(pending: true)},
    foreign_key: :user_id,
    class_name: :Subscription,
    dependent: :destroy
  
  has_many :pending_workspaces,
    through: :pending_subscriptions,
    source: :subscribeable,
    source_type: 'Workspace'
  # Important to specify source_type for polymorphic association through
  has_many :workspaces,
    through: :subscriptions,
    source: :subscribeable,
    source_type: 'Workspace'

  has_many :channels, 
    through: :subscriptions,
    source: :subscribeable,
    source_type: "Channel"

  has_many :admined_channels,
    foreign_key: :admin_id,
    class_name: :Channel

  has_many :direct_messages,
    through: :subscriptions,
    source: :subscribeable,
    source_type: "DirectMessage"

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def set_display_name
    self.display_name ||= self.email.match(/.*?(?=@|$)/i)[0]
  end

  def add_workspaces
    Workspace.where(name: ['Dunder Mifflin', 'App Academy', 'Greendale']).each { |ws| ws.add_new_member(self) }
  end
end
