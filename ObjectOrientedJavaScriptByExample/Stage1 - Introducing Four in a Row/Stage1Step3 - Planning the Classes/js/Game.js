class Game {
  constructor() {
    this.board = new Board();
    this.players = this.createPlayers();
    this.ready = false;
  }

/** 
 * Creates two player objects
 * @return  {Array}    An array of two Player objects.
 */
  createPlayers() {
    const players = [new Player("Player 1", "#e15258", 1, true), new Player("Player 2", "#e59a13", 2)];
    return players;
  }


  /**
   * Returns active player.
   * @return {Object}  player - The active player.
   */
  get activePlayer() {
      return this.players.find(player => player.active);
  }

  /* Gets game ready for play */
  startGame() {
      this.board.drawHTMLBoard();
      this.activePlayer.activeToken.drawHTMLToken();
      this.ready = true;
  }

  /**
 * Branches code, depending on what key player presses
 * @param   {Object}    e - Keydown event object
 */
  handleKeydown(e) {
      if (this.ready) {
          if (e.key === "ArrowLeft") {
              this.activePlayer.activeToken.moveLeft();
          } else if (e.key === "ArrowRight") {
            this.activePlayer.activeToken.moveRight(this.board.columns);
          } else if (e.key === "ArrowDown") {
            //play token
          }
      }
  }

  playToken() {
      let spaces = this.board.spaces;
      let activeToken = this.activePlayer.activeToken;
      let targetColumn = spaces[activeToken.columnLocation];
      let targetSpace = null;
      
      for (let space of targetColumn) {
          if (space.token === null) {
            targetSpace = space;
          }
      }

      if (targetSpace !== null) {
          game.ready = false;
          activeToken.drop(targetSpace, function() {
            game.updateGameState(activeToken, targetSpace);
          });
      }
  }

/** 
 * Switches active player. 
 */  
  switchPlayers() {
      for(let player of this.players) {
          player.active = player.active === true ? false : true;
      }
  }

/** 
 * Displays game over message.
 * @param {string} message - Game over message.      
 */
  gameOver(message) {
      document.getElementById("game-over").style.display = "block";
      document.getElementById("game-over").textContent = message;
  }  

/** 
 * Updates game state after token is dropped. 
 * @param   {Object}  token  -  The token that's being dropped.
 * @param   {Object}  target -  Targeted space for dropped token.
 */
  updateGameState(token, target) {
      target.mark(token);

      if(!this.activePlayer.checkTokens()) {

          this.switchPlayers();

          if (this.activePlayer.checkTokens()) {
              this.activePlayer.activeToken.drawHTMLToken();
              this.ready = true;
          } else {
              this.gameOver("No more tokens");
          }
  } else {
      this.gameOver(`${target.owner.name} wins!`)
  }
}