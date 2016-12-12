Rails.application.routes.draw do
  devise_for :users
  get '/profile', to: 'users#profile'
  post '/requests/approve', to: 'requests#approve'
  post '/requests/create', to: 'requests#create'
  post '/trips/create', to: 'trips#create'
  resources :trips
  root to: 'trips#index'

  namespace :api do
    post '/search', to: 'trips#search'
  end

end
