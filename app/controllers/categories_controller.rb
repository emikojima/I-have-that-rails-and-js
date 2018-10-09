class CategoriesController < ApplicationController

  def new
    @category = Category.new
    @categories = Category.all
    render layout: false
  end

  def create
    @categories = Category.all
    @category = Category.new(category_params)
    if @category.save
      render :one, :layout => false
      # redirect_to categories_path
    else
      @error = @category.errors.full_messages
      render :new
    end
  end

  def index
    @categories = Category.all
    render json: @categories
  end

  private
  def category_params
    params.require(:category).permit(:name, :description)
  end
end
