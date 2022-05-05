json.channel do
  json.extract! @channel, :id, :name, :description, :workspace_id, :public, :admin_id, :subscription_ids, :message_ids
end

# current_user.subscriptions.where(subscribeable_id: @channel.id).first 

json.subscriptions do
  @channel.subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :user_id, :subscribeable_id, :subscribeable_type
    end
  end
end

if @channel.messages.empty?
  json.messages({})
else
  json.messages do
    @channel.messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
      end
    end
  end
end

json.users do
  @channel.members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :display_name, :email
    end
  end
end