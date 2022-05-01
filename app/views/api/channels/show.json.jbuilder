json.channel do
  json.extract! @channel, :id, :name, :description, :workspace_id, :public
end

# current_user.subscriptions.where(subscribeable_id: @channel.id).first 

json.subscription do
  json.extract! @subscription, :id, :subscribeable_id, :subscribeable_type
end