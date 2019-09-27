class Api::MessagesController < ApplicationController
  def index
    # binding.pry
    group = Group.find(params[:group_id])
    respond_to do |format|
      format.json{ @messages = group.messages.includes(:user).where("id > ?", params[:id])}
    end
  end
end