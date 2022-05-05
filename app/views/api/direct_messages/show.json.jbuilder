json.direct_message do
  json.extract! @direct_message, :id, :workspace_id, :group
end

json.subscriptions do
  @direct_message.subscriptions.each do |subscription|
    json.set! subscription.id do
      json.extract! subscription, :id, :user_id, :subscribeable_id, :subscribeable_type
    end
  end
end

json.users do
  @direct_message.members.each do |member|
    json.set! member.id do
      json.extract! member, :id, :display_name, :email
    end
  end
end

if @direct_message.messages.empty?
  json.messages({})
else
  json.messages do
    @direct_message.messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
      end
    end
  end
end
