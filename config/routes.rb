Rails.application.routes.draw do
  resources :tasks
  root to: 'index#index'
  resources :journal_entries
  resources :journals
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
