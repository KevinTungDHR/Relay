json.members do
  @workspace.members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :email, :display_name
    end
  end
end

json.subscriptions do
  @workspace.subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :subscribeable_id, :subscribeable_type
    end
  end
end

# Add channels, dms, group chats and threads when schema is created