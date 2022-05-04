Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, default: { format: :json } do
    resources :users, only: [:create, :update, :destroy]
    resource :session, only: [:create, :destroy]

    resources :workspaces, only: [:index, :show, :create, :update, :destroy] do
      member do
        get :search, to: 'workspaces#search', as: 'search'
        get :searchmembers, to: 'workspaces#search_members', as: 'search_members'
        post :subscribe, to: 'workspaces#subscribe', as: 'subscribe'
        post :unsubscribe, to: 'workspaces#unsubscribe', as: 'unsubscribe'
      end
    end
    
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      member do
        post :subscribe, to: 'channels#subscribe', as: 'subscribe'
        post :unsubscribe, to: 'channels#unsubscribe', as: 'unsubscribe'
        post :messages, to: 'channels#create_message', as: 'messages'
      end
    end
  end
end
