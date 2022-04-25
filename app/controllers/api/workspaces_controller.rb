class Api::WorkspacesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    @workspaces = current_user.workspaces
    render :index
  end
    
  def show
    @workspace = current_user.workspaces.find(params[:id])
    render :show
  end
    
  def create
    @workspace = Workspace.new(workspace_params)
    @workspace.owner_id = current_user.id
    if @workspace.save
      render :show
    else
      render json: @workspace.errors.full_messages, status: 401
    end
  end
    
  def update
    @workspace = current_user.workspaces.find(params[:id])
    if @workspace.update(workspace_params)
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end
    
  def destroy
    @workspace = current_user.workspaces.find(params[:id])
    if @workspace.destroy
      render :show
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  private
  def not_found
    render json: ['Workspace not found'], status: 404
  end
    
  def workspace_params
    params.require(:workspace).permit(:name, :url)
  end
end
