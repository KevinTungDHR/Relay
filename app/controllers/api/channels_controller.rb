class Api::ChannelsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

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

  private
  def not_found
    render json: ['Channel not found'], status: 404
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :public, :workspace_id)
  end
end
