json.user do
  json.partial! '/api/user_partials/user', user: @user
end

json.workspaces do
  @user.workspaces.only_signedin.each do |workspace|
    json.set! workspace.id do
      json.partial! '/api/workspaces/workspace', workspace: workspace
    end
  end
end