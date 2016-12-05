Rails.application.routes.draw do
  devise_for :users
  get 'profile', to: 'users#profile'
  root to: 'site#home'
end
