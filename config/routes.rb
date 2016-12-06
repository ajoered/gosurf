Rails.application.routes.draw do
  devise_for :users
  get '/profile', to: 'users#profile'
  post '/search', to: 'trips#search'
  resources :trips
  root to: 'trips#index'
end
