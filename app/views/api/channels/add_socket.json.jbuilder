json.channel do
  json.extract! channel, :id, :name, :description, :workspace_id, :public, :admin_id,  :subscription_ids, :message_ids, :required
end

json.users do
  channel.members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :display_name, :email
    end
  end
end

json.subscriptions do 
  channel.subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :user_id, :subscribeable_id, :subscribeable_type
    end
  end
end
