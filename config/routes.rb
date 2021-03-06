Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  resources :categories, only:[:new, :create, :index]
  resources :users, except:[:show]
  resources :users, only:[:show] do
    resources :items, only:[:show, :index, :new, :edit, :create, :update, :destroy]
  end
  root to: 'static#welcome'
  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get '/firstpage', to: 'static#firstpage'
  get '/items', to: 'items#all'
  get '/users/:id/next', to: 'users#next'
  get '/signin', to: 'sessions#new'
  post '/signin', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  post '/logout', to: 'sessions#destroy'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
