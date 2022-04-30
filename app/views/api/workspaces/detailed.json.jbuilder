json.users do
  current_user.channels.where(workspace: @workspace.id).includes(:members).each do |channel|
    channel.members.each do |member|
      json.set! member.id do
        json.extract! member, :id, :email, :display_name
      end
    end
  end
end

# GETTING ONLY SUBSCRIPTIONS FOR THIS WORKSPACE OR WORKSPACES THAT ARE SIGNED IN
subscriptions = current_user.subscriptions.joins("left join channels on subscriptions.subscribeable_id = channels.id")
  .where("channels.workspace_id = :workspace_id OR (subscriptions.subscribeable_type = 'Workspace' AND subscriptions.signed_in = true)", workspace_id: @workspace.id)

json.subscriptions do
  subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :subscribeable_id, :subscribeable_type
    end
  end
end

json.channels do
  current_user.channels.where(workspace: @workspace.id).each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :name, :description, :workspace_id, :public
    end
  end
end
# Add channels, dms, group chats and threads when schema is created

# OLD

# json.users do
#   @workspace.channels.each do |channel|
#     json.set! member.id do
#       json.extract! member, :id, :email, :display_name
#     end
#   end
# end

# json.subscriptions do
#   @workspace.subscriptions.each do |subscription|
#     json.set! subscription.id do
#       json.extract! subscription, :id, :subscribeable_id, :subscribeable_type
#     end
#   end
# end

# # Add channels, dms, group chats and threads when schema is created