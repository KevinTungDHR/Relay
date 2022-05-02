subscriptions = current_user.subscriptions

# Written without include? and using SQL references
@channels = @channels.includes(:members)
  .where("channels.public = true OR users.id = :current_user_id", current_user_id: current_user.id)
  .references(:members)
@channels.each do |channel|
  # if (channel.public || channel.members.include?(current_user))
    json.set! channel.id do
      json.extract! channel, :id, :name, :description, :public, :workspace_id
    end
  # end
end