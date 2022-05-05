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
subscriptions = Subscription.joins("left join channels on subscriptions.subscribeable_id = channels.id")
  .where("channels.workspace_id = :workspace_id OR (subscriptions.subscribeable_type = 'Workspace' AND subscriptions.signed_in = true)", workspace_id: @workspace.id)
  .joins("join subscriptions AS channel_subs on channels.id = channel_subs.subscribeable_id")
  .where("channel_subs.user_id = :user_id", user_id: current_user.id)
# subscriptions = current_user.channels.where(workspace_id: @workspace.id).subscriptions.uniq

json.subscriptions do
  subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :user_id, :subscribeable_id, :subscribeable_type
    end
  end
end

json.channels do
  current_user.channels.where(workspace: @workspace.id).each do |channel|
    json.set! channel.id do
      json.extract! channel, :id, :name, :description, :workspace_id, :public, :admin_id
    end
  end
end

json.direct_messages do

  current_user.direct_messages.where(workspace_id: @workspace.id).each do |direct_message|

    json.set! direct_message.id do
      json.extract! direct_message, :id, :workspace_id, :subscription_ids, :message_ids
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