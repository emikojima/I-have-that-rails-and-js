class CategoriesController < ApplicationController
  def new
    @category = Category.new
    @categories = Category.all
  end

  def create
    @categories = Category.all
    @category = Category.new(category_params)
    if @category.save
      redirect_to categories_path
    else
      @error = @category.errors.full_messages
      render :new
    end
  end

  def index
    if params[:search] && !params[:search].blank?
      @items = Item.where('name LIKE ?', "%#{params[:search]}%")
      if @items.blank?
        flash[:message] = "There are no items that match '#{params[:search]}'."
        redirect_to categories_path
      end
    else
      @categories = Category.all
    end
  end

  def pop
    @category = Category.joins(:items).select("categories.*, COUNT(category_id) as scount").order("scount DESC").first
    # items = Item.group(:category_id).to_a
    # @item = items.first
  end

  private
  def category_params
    params.require(:category).permit(:name, :description)
  end
end
