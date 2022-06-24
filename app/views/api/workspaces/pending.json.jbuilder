if @subscriptions.empty?
  json.subscriptions({})
else
  json.subscriptions do
    @subscriptions.each do |sub|
      json.set! sub.id do
        json.extract! sub, :id, :user_id, :subscribeable_id, :subscribeable_type
      end
    end
  end
end


if @subscriptions.empty?
  json.workspaces({})
else
  json.workspaces do
    @subscriptions.each do |sub|
      json.set! sub.subscribeable.id do
        json.extract! sub.subscribeable, :id, :name, :url, :owner_id
      end
    end
  end
end
