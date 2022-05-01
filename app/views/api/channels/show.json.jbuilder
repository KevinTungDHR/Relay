json.channel do
  json.set! @channel.id do
    json.extract! @channel, :id, :name, :description, :workspace_id, :public
  end
end

subscription = current_user.subscriptions.where(subscribeable_id: @channel.id).first 

json.subscription do
  json.set! subscription.id do
    json.extract! subscription, :id, :subscribeable_id, :subscribeable_type
  end
end