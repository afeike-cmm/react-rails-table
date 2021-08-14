class NonPlayableCharacterApiController < ApplicationController
    before_action :set_npc, only: [:show, :edit, :update, :destroy]

    def index
        @npcs = NonPlayableCharacter.all.order(first_name: :asc)
        render json: @npcs
    end

    def show
        if @npc
            render json: @npc
        else
            render json: @npc.errors
        end
    end

    def new 
        @npc = NonPlayableCharacter.new
    end

    def edit

    end

    def create
        @npc = NonPlayableCharacter.new(npc_params)

        if @npc.save
            render json: @npc
        else
            render json: @npc.errors
        end
    end

    def update

    end

    def destroy
        @npc.destroy

        render json: { notice: 'NPC was successfully removed' }
    end

    private
        def set_npc
            @npc = NonPlayableCharacter.find(params[:id])
        end

        def npc_params
            params.permit(:first_name, :last_name, :city, :race, :weapon)
        end
end
