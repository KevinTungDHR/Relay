class Api::MessagesController < ApplicationController
  def update
    @message = Message.find(params[:id])

    if @message.update(message_params)
      messageable = @message.messageable
      WorkspaceChannel.broadcast_to(messageable, from_template('api/channels/message', message: @message))
      render :show
    else
      render @message.errors.full_messages, status: 402
    end
  end

  private
  def message_params
    params.require(:message).permit(:body)
  end
end
