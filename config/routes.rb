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
        post :invite, to: 'workspaces#invite', as: 'invite'
        post :accept, to: 'workspaces#accept', as: 'accept'
        post :decline, to: 'workspaces#decline', as: 'decline'
      end

      collection do
        get :pending_subscriptions, to: 'workspaces#pending_subscriptions', as: 'pending_subscriptions'
      end 
    end
    
    resources :channels, only: [:index, :create, :show, :update, :destroy] do
      member do
        post :subscribe, to: 'channels#subscribe', as: 'subscribe'
        post :unsubscribe, to: 'channels#unsubscribe', as: 'unsubscribe'
        post :messages, to: 'channels#create_message', as: 'messages'
        post :addmembers, to: 'channels#add_members', as: 'add_members'
      end
    end

    resources :direct_messages, only: [:index, :create, :show, :update] do
      member do
        post :messages, to: 'direct_messages#create_message', as: 'messages'
        patch :close_message, to: 'direct_messages#close_message', as: 'close_messages'
      end
    end

    resources :messages, only: [:update]
  end
end
