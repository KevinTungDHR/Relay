channels = current_user.channels.where(workspace: @workspace.id).includes(:members, :messages, :subscriptions)

if channels.empty?
  json.users({})
else
  json.users do
    channels.each do |channel|
      channel.members.each do |member|
        json.set! member.id do
          json.extract! member, :id, :email, :display_name
        end
      end
    end
  end
end
# GETTING ONLY SUBSCRIPTIONS FOR THIS WORKSPACE OR WORKSPACES THAT ARE SIGNED IN
# subscriptions = Subscription.joins("left join channels on subscriptions.subscribeable_id = channels.id")
#   .where("channels.workspace_id = :workspace_id OR (subscriptions.subscribeable_type = 'Workspace' AND subscriptions.connected = true)", workspace_id: @workspace.id)
#   .joins("join subscriptions AS channel_subs on channels.id = channel_subs.subscribeable_id")
#   .where("channel_subs.user_id = :user_id", user_id: current_user.id)
# subscriptions = current_user.channels.where(workspace_id: @workspace.id).subscriptions.uniq


# all messages for current user
subscriptions =  Subscription.joins("left join direct_messages on subscriptions.subscribeable_id = direct_messages.id")
  .where("direct_messages.workspace_id = :workspace_id OR (subscriptions.subscribeable_type = 'Workspace' AND subscriptions.connected = true)", workspace_id: @workspace.id)
  .joins("join subscriptions AS d_subs on direct_messages.id = d_subs.subscribeable_id")
  .joins("join users on d_subs.user_id = users.id")


if subscriptions.empty?
  json.subscriptions({})
else
  json.subscriptions do
    subscriptions.each do |subscription|
      json.set! subscription.id do
        json.extract! subscription, :id, :user_id, :subscribeable_id, :subscribeable_type
      end
    end
  end
end


if channels.empty?
  json.channels({})
else
  json.channels do
    channels.each do |channel|
      json.set! channel.id do
        json.extract! channel, :id, :name, :description, :workspace_id, :public, :admin_id,  :subscription_ids, :message_ids, :required
      end
    end
  end
end


direct_messages = current_user.direct_messages
  .where(workspace_id: @workspace.id)
  .where(subscriptions: { connected: true })
  .includes(:subscriptions, :messages)
  .references(:subscriptions)

if direct_messages.empty?
  json.direct_messages({})
else
  json.direct_messages do
    direct_messages.each do |direct_message|
      json.set! direct_message.id do
        json.extract! direct_message, :id, :workspace_id, :subscription_ids, :message_ids, :name
      end
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