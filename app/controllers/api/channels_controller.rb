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
      @subscriptions = @channel.subscriptions

      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def show
    @channel = current_user.channels.includes(:members, :subscriptions, :messages).find(params[:id])

    if @channel
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def update
    @channel = Channel.find(params[:id])
    # if @channel.admin != current_user
    #   render json: ['Must be a channel admin to have edit privileges'], status: 422
    if @channel.update(channel_params)
      @subscriptions = @channel.subscriptions
      render :show
    else
      render json: @channel.errors.full_messages, status: 401
    end
  end

  def destroy
    @channel = current_user.admined_channels.find(params[:id])
    @subscriptions = @channel.subscriptions
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
      # @subscription.pending = true unless @channel.public
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

  def add_members 
    @channel = Channel.find(params[:id])
    if(ActiveModel::Type::Boolean.new.cast(params[:all_members]))
      members = @channel.workspace.members
      members.each { |member| @channel.members << member unless @channel.members.include?(member) }
    else
      members_id = params[:members].keys.map(&:to_i)
      members_id.each do |member_id| 
        user = User.find(member_id) 
        @channel.members << user unless @channel.members.include?(user)
      end
    end
    
    if @channel.save
      @channel.members.each do |user|
        WorkspaceChannel.broadcast_to(user, { data: from_template('api/channels/add_socket', channel: @channel), broadcast_type: 'new_channel' })
      end
      render :add
    else
      render json: @channel.errors.full_messages, status: 422
    end
  end

  def create_message
    @channel = current_user.channels.find(params[:id])
    @message = @channel.messages.new(message_params)
    @message.author = current_user

    if @message.save!
      WorkspaceChannel.broadcast_to(@channel, from_template('api/channels/message', message: @message))
      render :message, locals: { message: @message }
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end

  def not_found
    render json: ['Channel not found'], status: 404
  end

  def channel_params
    params.require(:channel).permit(:name, :description, :public, :workspace_id, :all_members)
  end

  def subscription_params
  end
end
