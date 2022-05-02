subscriptions = current_user.subscriptions

@channels.each do |channel|
  if (channel.public || channel.members.include?(current_user))
    json.set! channel.id do
      json.extract! channel, :id, :name, :description, :public, :workspace_id
    end
  end
end