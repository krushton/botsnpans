class GamesController < ApplicationController
 

  # check if user is authenticated, if so send down all of the data needed for the game
  # not sure if this controller is necessary
  # GET /games
  # GET /games.json
  def index
      
  end

  # create a new game after a new user account is created.
  # POST /games
  # POST /games.json
  def create
    #create a new game
    @game = Game.new(params[:game])
    @game.save
  end
end
