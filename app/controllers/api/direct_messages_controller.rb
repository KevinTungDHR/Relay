class Api::DirectMessagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
    # search functionality
  end

  def create
    user_ids = JSON.parse(params[:direct_message][:user_ids])
    @direct_message = DirectMessage.getExistingGroup(user_ids)

    if @direct_message
      render :show
    else
      @direct_message = DirectMessage.new(direct_message_params)
      if @direct_message.save
        render :show
      else
        render @direct_message.errors.full_messages, status: 422
      end
    end
  end

  def show
    @direct_message = DirectMessage.find(params[:id])
    if @direct_message
      render :show
    else
      render @direct_message.errors.full_messages, status: 401
    end
  end


  def create_message
    @direct_message = current_user.direct_messages.find(params[:id])
    @message = @direct_message.messages.new(message_params)
    @message.author = current_user

    if @message.save!
      WorkspaceChannel.broadcast_to(@direct_message, from_template('api/channels/message', message: @message))
      render :message, locals: { message: @message }
    else
      render json: @message.errors.full_messages, status: 422
    end
  end


  private
  def message_params
    params.require(:message).permit(:body)
  end

  def direct_message_params
    params.require(:direct_message).permit(:workspace_id, :user_ids)
  end

  def not_found
    render json: ['Direct message not found'], status: 404
  end
end
