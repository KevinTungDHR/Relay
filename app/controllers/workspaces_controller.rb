class WorkspacesController < ApplicationController
  def index

  end

  def show

  end

  def create

  end

  def update

  end

  def destroy
  end

  def workspace_params
    params.require(:workspace).permit(:name, :url)
  end
end
