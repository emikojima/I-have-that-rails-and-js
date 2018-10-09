class ItemsController < ApplicationController
  before_action :page_user
  before_action :page_user_item, only: [:edit, :show, :destroy, :update]
  skip_before_action :verify_authenticity_token, only: [:destroy]

  def new
    if own_page?
      @item  = Item.new(user_id: @user.id)
      @catgories = Category.all
      render layout: false
    else
      redirect_to user_path(current_user)
    end
   end

   def index
    @items = @user.items
      render json: @items
   end

  def create
    @item = Item.new(item_params)
    @user = User.find(params[:user_id])

    if @item.save
      # flash[:message] = "Item successfully created."
      render :one, :layout => false
    else
      @error = @item.errors.full_messages
    end
  end

  def show
    render json: @item, only:['@user']
  end

  def all
    @items = Item.search_items(params[:search])
    render json: @items
    if @items.empty?
      flash[:message] = "Oh no! There are no items for lending in #{params[:search].titleize}."
      redirect_to items_path
    end
  end

  def edit
    @catgories = Category.all
    render layout: false

    if !own_page?
      flash[:message] = "You cannot edit someone else's item."
      redirect_to items_path

    end
  end

  def update
    @item.update(item_params)
    render :one, :layout => false
  end

  def destroy
    @item.delete
     render json: @user
  end

  private
  def item_params
    params.require(:item).permit(:name, :description, :user_id, :review_id, :available, :category_id, :city)
  end

  def page_user
    @user = User.find_by(id: params[:user_id])
  end

  def page_user_item
    @item = @user.items.find_by(id: params[:id])
  end

  def own_page?
    current_user.id == page_user.id
  end
end
