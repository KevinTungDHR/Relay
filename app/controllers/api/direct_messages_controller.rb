class Api::DirectMessagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def index
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

  private
  def direct_message_params
    params.require(:direct_message).permit(:workspace_id, :user_ids)
  end

  def not_found
    render json: ['Direct message not found'], status: 404
  end
end
