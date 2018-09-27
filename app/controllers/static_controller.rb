class StaticController < ApplicationController
  def welcome
    if logged_in?
      redirect_to users_path
    end 
  end
end
