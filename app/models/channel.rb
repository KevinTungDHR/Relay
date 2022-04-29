class Channel < ApplicationRecord
  validates :name, presence: true, uniqueness: { scope: :workspace_id}
  validates :description, presence: true, allow_blank: true
  validates :public, inclusion: { in: [true, false]}

  before_save :add_owner_as_member, if: :new_record?
  after_initialize :ensure_description

  belongs_to :admin,
    foreign_key: :admin_id,
    class_name: :User

  belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: :Workspace

  has_many :subscriptions, as: :subscribeable, dependent: :destroy

  has_many :members,
    through: :subscriptions,
    source: :user
  
  def ensure_description
    self.description ||= ""
  end

  # user association to add to list
  def add_owner_as_member
    self.members << self.admin
  end
  
end
