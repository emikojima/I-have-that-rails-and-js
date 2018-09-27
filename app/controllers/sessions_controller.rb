class SessionsController < ApplicationController
   def create
    auth = request.env["omniauth.auth"]
    if auth
      sign_in_with_auth(auth)
    else
      sign_in_with_password
    end
   end

  def sign_in_with_auth(auth)
    @user = User.from_omniauth(request.env["omniauth.auth"])
  	session[:user_id] = @user.id
    redirect_to user_path(@user)
  end

  def sign_in_with_password
    @user = User.find_by(name: params[:user][:name])
    if @user && @user.authenticate(params[:user][:password])
       session[:user_id] = @user.id
       redirect_to user_path(@user)
     else
       @error = ["Invalid username and/or password"]
       render 'new'
     end
   end

   def destroy
     session.delete :user_id
     redirect_to '/'
   end
end
