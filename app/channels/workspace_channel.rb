class WorkspaceChannel < ApplicationCable::Channel
  def subscribed
    if(params[:type] == 'Channel')
      @channel = Channel.find(params[:id])
      stream_for @channel
    end
  end
end