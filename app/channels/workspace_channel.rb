class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    if(params[:type] == 'Channel')
      @channel = Channel.find(params[:id])
      stream_for @channel
    end

    if(params[:type] == 'DirectMessage')
      @direct_message = DirectMessage.find(params[:id])
      stream_for @direct_message
    end
  end
end