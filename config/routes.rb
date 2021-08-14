Rails.application.routes.draw do
  root 'non_playable_characters#index'
  get 'non_playable_character_api/index'
  post 'non_playable_character_api/:id', to: 'non_playable_character_api#create'
  delete 'non_playable_character_api/:id', to: 'non_playable_character_api#destroy'

end
