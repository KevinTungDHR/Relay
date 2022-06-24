class Api::WorkspacesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def search
    @ws_with_channels = current_user.workspaces.search_channels(params[:query]).find_by(id: params[:id])
    @ws_with_members = current_user.workspaces.search_members(params[:query]).find_by(id: params[:id])
    render :search
  end

  def search_members
    @ws_with_members = current_user.workspaces.search_members(params[:query]).find_by(id: params[:id])
    render :search
  end

  def index
    if params[:only_signedin]
      @workspaces = current_user.workspaces.only_signedin
    else
      @workspaces = current_user.workspaces
    end
    render :index
  end
    
  def show
    @workspace = current_user.workspaces.find(params[:id])
    if @workspace
      render :detailed
    else
      render json: @workspace.errors.full_messages, status: 401
    end
  end
    
  def create
    @workspace = Workspace.generate_workspace
    @workspace.owner_id = current_user.id
    if @workspace.save
      render :overview
    else
      render json: @workspace.errors.full_messages, status: 401
    end
  end
    
  def update
    @workspace = current_user.workspaces.find(params[:id])
    if @workspace.update(workspace_params)
      render :detailed
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end
    
  def destroy
    @workspace = current_user.workspaces.find(params[:id])
    if @workspace.destroy
      render json: {}
    else
      render json: @workspace.errors.full_messages, status: 422
    end
  end

  def pending_subscriptions
    @subscriptions = current_user.pending_subscriptions.where(subscribeable_type: 'Workspace').includes(:subscribeable)

    render :pending
  end

  def sign_in
  end

  def sign_out
  end


  def subscribe
    render json: {}
  end

  def unsubscribe
    render json: {}
  end

  def invite
    begin
      @workspace = Workspace.find(params[:id])
      users = User.where(email: params[:workspace][:user_emails])
      invited = @workspace.invite_users(users)
      render json: {}
    rescue Exception => e
      render json: ['Error inviting users'], status: 422
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
