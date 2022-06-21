direct_messages = current_user.direct_messages
.where(workspace_id: @workspace.id)
.where(subscriptions: { connected: true })
.includes(:subscriptions, :messages)
.references(:subscriptions)

dm_ids = direct_messages.map { |dm| dm.id }
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

messages = Message.where("messageable_type = 'DirectMessage' AND messageable_id IN (:dm_ids)", dm_ids: dm_ids)

if direct_messages.empty? || messages.empty?
  json.messages({})
else
  json.messages do 
    messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
      end
    end
  end
end
