json.channel do
  json.extract! @channel, :id, :name, :description, :workspace_id, :public
end

# current_user.subscriptions.where(subscribeable_id: @channel.id).first 

json.subscription do
  json.extract! @subscription, :id, :subscribeable_id, :subscribeable_type
end

json.messages do
  @channel.messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
    end
  end
end