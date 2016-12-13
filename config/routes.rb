Rails.application.routes.draw do
  devise_for :users
  get '/profile', to: 'users#profile'
  post '/trips/create', to: 'trips#create'
  resources :trips
  root to: 'trips#index'

  namespace :api do
    post '/search', to: 'trips#search'
    post '/requests/approve', to: 'requests#approve'
    post '/requests/create', to: 'requests#create'
  end

end
