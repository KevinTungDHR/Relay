class WorkspacesController < ApplicationController
  def index
    @workspaces = current_user.workspaces
    return :index
  end

  def show
    @workspace = Workspace.find(params[:id])
    return :show
  end

  def create

  end

  def update

  end

  def destroy
  end

  def workspace_params
    params.require(:workspace).permit(:name, :url)
  end
end
