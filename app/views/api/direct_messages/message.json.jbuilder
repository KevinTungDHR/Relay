json.message do
  json.extract! message, :id, :body, :author_id, :messageable_id, :messageable_type, :created_at, :updated_at
end

json.user do
  json.extract! message.author, :id, :display_name, :email
end