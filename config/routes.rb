Rails.application.routes.draw do
  devise_for :users
  get '/profile', to: 'users#profile'
  post '/search', to: 'trips#search'
  post '/requests/approve', to: 'requests#approve'
  resources :trips
  root to: 'trips#index'
end
