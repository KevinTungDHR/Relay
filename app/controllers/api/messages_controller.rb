class Api::MessagesController < ApplicationController
  def update
    @message = Message.find(params[:id])

    if @message.update(message_params)
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
