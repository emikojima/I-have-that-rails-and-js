class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:destroy]

  def new
    if !logged_in?
      @user = User.new
    else
      render 'static/firstpage'
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to '/firstpage'
    else
      @error = @user.errors.full_messages
      render 'new'
    end
  end

  def show
    @user = User.find_by(id: params[:id])
      render json: @user
  end

  def index
    @users = User.all
    render json: @users
  end

  def next
    @user = User.find_by(id: params[:id])
    @next = @user.next
    render json: @next
  end

  def edit
    if session[:user_id] == params[:id].to_i
      @user = current_user
    else
      flash[:message] = "You cannot edit someone else's page."
      redirect_to users_path
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      redirect_to user_path(@user)
    else
      @error = @user.errors.full_messages
    render 'edit'
    end
  end

  def destroy
      User.find(params[:id]).destroy
      flash[:message] = "Account Deleted"
      redirect_to root_path
  end

  private
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :city, :state, :email)
  end
end
