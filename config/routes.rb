Rails.application.routes.draw do
  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  resources :categories
  resources :users, except:[:show]
  resources :users, only:[:show] do
  resources :items, only:[:show, :index, :new, :edit, :create, :update, :destroy]

  end
  root to: 'static#welcome'
  get 'login', to: redirect('/auth/google_oauth2'), as: 'login'
  get '/items', to: 'items#all'
  get '/signin', to: 'sessions#new'
  post '/signin', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'
  post '/logout', to: 'sessions#destroy'
  get '/popular', to: 'categories#pop'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
