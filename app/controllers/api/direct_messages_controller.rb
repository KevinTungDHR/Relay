class Api::DirectMessagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    @workspace = current_user.workspaces.find(params[:workspace_id])
    if @workspace
      render :index
    else
      render json: @workspace.errors.full_messages, status: 401
    end
  end

  def create
    user_ids =(params[:direct_message][:user_ids]).map(&:to_i)
    
    @direct_message = DirectMessage.getExistingGroup([*user_ids, current_user.id].uniq)

    if @direct_message
      @direct_message.subscriptions.update_all({connected: true })
      if(params[:direct_message][:body])
        message = @direct_message.messages.new(direct_message_body_params)
        message.author = current_user
        message.save!
      end
      @direct_message.members.each do |user|
        WorkspaceChannel.broadcast_to(user, { data: from_template('api/channels/direct_message', direct_message: @direct_message), broadcast_type: 'new_dm' })
      end

      render :show
    else
      @direct_message = DirectMessage.new(direct_message_params)
      @direct_message.creator = current_user
      if(params[:direct_message][:body])
        message = @direct_message.messages.new(direct_message_body_params)
        message.author = current_user
        message.save!
      end
      if @direct_message.save
        @direct_message.members.each do |user|
          WorkspaceChannel.broadcast_to(user, { data: from_template('api/channels/direct_message', direct_message: @direct_message), broadcast_type: 'new_dm' }) unless user == current_user
        end
  
        render :show
      else
        render @direct_message.errors.full_messages, status: 422
      end
    end
  end

  def show
    @direct_message = DirectMessage.find(params[:id])
    if @direct_message
      @direct_message.subscriptions.where(user_id: current_user.id).first.update(connected: true)
      render :show
    else
      render @direct_message.errors.full_messages, status: 401
    end
  end


  def create_message
    @direct_message = current_user.direct_messages.find(params[:id])
    @message = @direct_message.messages.new(message_params)
    @message.author = current_user

    if @message.save
      WorkspaceChannel.broadcast_to(@direct_message, from_template('api/channels/message', message: @message))
      render :message, locals: { message: @message }
    else
      render json: @message.errors.full_messages, status: 422
    end
  end

  def close_message
    @direct_message = DirectMessage.find(params[:id])
    if @direct_message.subscriptions.where(user_id: current_user.id).first.update(connected: false)
      render :show
    else
      render @direct_message.errors.full_messages, status: 401
    end
  end 


  private
  def message_params
    params.require(:message).permit(:body)
  end

  def direct_message_body_params
    params.require(:direct_message).permit(:body)
  end

  def direct_message_params
    params.require(:direct_message).permit(:workspace_id, user_ids: [])
  end

  def not_found
    render json: ['Direct message not found'], status: 404
  end
end
