class Api::ChannelsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    @channels = current_user.workspaces.find(params[:workspace_id]).channels
    if @channels
      render :index
    else
      render json: @channels.errors.full_messages, status: 401
    end
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.admin = current_user
    if @channel.save
      @subscription = @channel.subscriptions.find_by(user_id: current_user)

      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def show
    @channel = current_user.channels.find(params[:id])

    if @channel
      @subscription = @channel.subscriptions.find_by(user_id: current_user)
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def update
    @channel = current_user.admined_channels.find(params[:id])
    if @channel.update(channel_params)
      @subscription = @channel.subscriptions.find_by(user_id: current_user)
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def destroy
    @channel = current_user.admined_channels.find(params[:id])
    @subscription = @channel.subscriptions.find_by(user_id: current_user)
    if @channel.destroy
      render :show
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def subscribe
    @channel = Channel.find(params[:id])
    if current_user.workspaces.exists?(@channel.workspace_id)
      @subscription = @channel.subscriptions.new(user_id: current_user.id)
      @subscription.pending = true unless @channel.public
      if @subscription.save
        render :show
      else
        render json: @subscription.errors.full_messages, status: 422
      end
    else
      render json: ["User not a member of workspace"], status: 422
    end
  end

  def unsubscribe
    @channel = Channel.find(params[:id])
    @subscription = current_user.subscriptions.where("subscribeable_type = 'Channel' and subscribeable_id = :id", id: params[:id]).first

    if @subscription
      @subscription.destroy
      render :show
    else
      render json: ["subscription not found"], status: 422
    end

  end

  private
  def not_found
    render json: ['Channel not found'], status: 404
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :public, :workspace_id)
  end

  def subscription_params
  end
end
