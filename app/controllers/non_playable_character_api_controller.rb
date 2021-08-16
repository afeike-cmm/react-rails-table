class NonPlayableCharacterApiController < ApplicationController
    before_action :set_npc, only: [:show, :edit, :update, :destroy]

    def index
        filters = get_filters
        npcs = NonPlayableCharacter
        npcs = npcs.where("LOWER(first_name) LIKE ?", "#{filters[:first_name].downcase}%") if filters[:first_name]
        npcs = npcs.where("LOWER(last_name) LIKE ?", "#{filters[:last_name].downcase}%") if filters[:last_name]
        npcs = npcs.order('first_name ASC')
        npcs = npcs.paginate(page: params[:page_index], per_page: params[:page_size])
        # binding.pry
        results = { :data => npcs, :total => npcs.total_entries }
        render json: results
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

        def get_filters
            filters = {
                :first_name => params[:firstName],
                :last_name => params[:lastName]
            }
            filters.compact_blank
        end
end
