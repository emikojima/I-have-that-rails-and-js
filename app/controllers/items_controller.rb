class ItemsController < ApplicationController
  before_action :page_user
  before_action :page_user_item, only: [:edit, :show, :destroy, :update]

  def new
    if own_page?
      @item  = Item.new(user_id: @user.id)
      @catgories = Category.all
    else
      redirect_to user_path(current_user)
    end
   end

   def index
    @items = @user.items
   end

  def create
    @item = Item.new(item_params)
    @user = User.find(params[:user_id])
    if @item.save
      flash[:message] = "Item successfully created."
      redirect_to user_item_path(@user, @item)
    else
      @error = @item.errors.full_messages
      render 'new'
    end
  end

  def show
  end

  def all
    @items = Item.search_items(params[:search])
    if @items.empty?
      flash[:message] = "Oh no! There are no items for lending in #{params[:search].titleize}."
      redirect_to items_path
    end
  end

  def edit
    @catgories = Category.all
    if !own_page?
      flash[:message] = "You cannot edit someone else's item."
      redirect_to items_path
    end
  end

  def update
    @item.update(item_params)
    redirect_to user_item_path(@user, @item)
  end

  def destroy
    @item.delete
    redirect_to user_items_path(@user)
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
