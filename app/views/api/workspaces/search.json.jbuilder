if @ws_with_channels
  json.channels do
    @ws_with_channels.channels.each do |channel|
      json.set! channel.id do
        json.extract! channel, :id, :name, :description, :workspace_id, :public, :admin_id, :required
      end
    end
  end
else
  json.channels({})
end

if @ws_with_members
  json.users do
    @ws_with_members.members.each do |member|
      json.set! member.id do
        json.extract! member, :id, :email, :display_name
      end
    end
  end
else
  json.users({})
end

