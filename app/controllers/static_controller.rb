class StaticController < ApplicationController
  def welcome
    if logged_in?
      redirect_to '/firstpage'
    end
  end

  def firstpage
    render 'firstpage'
  end
end
