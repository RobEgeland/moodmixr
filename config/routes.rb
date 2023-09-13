Rails.application.routes.draw do
  post '/login', to: 'users#find_or_create_by_id'
  delete '/logout', to: 'sessions#destroy'
  get '/current-user', to: 'users#get_current_user'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
