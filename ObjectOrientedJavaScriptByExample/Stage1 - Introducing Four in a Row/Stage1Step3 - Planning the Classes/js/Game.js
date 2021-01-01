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
            // move left
          } else if (e.key === "ArrowRight") {
            // move right
          } else if (e.key === "ArrowDown") {
            //play token
          }
      }
  }
}