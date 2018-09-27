class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?, :own_page?
  before_action :require_login, only: [:show, :index, :edit, :all]
  # before_action :own_page?, only: [:edit]
  def current_user
    user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    current_user != nil
  end

  def require_login
   unless logged_in?
     redirect_to '/'
   end
  end




end
