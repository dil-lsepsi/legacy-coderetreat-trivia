export class GameState{
    public players: Array<string> = [];
    public places: Array<number> = [];
    public purses: Array<number> = [];
    public inPenaltyBox: Array<boolean> = [];
    public currentPlayer: number = 0;
    public isGettingOutOfPenaltyBox: boolean = false;

    public popQuestions: Array<string> = [];
    public scienceQuestions: Array<string> = [];
    public sportsQuestions: Array<string> = [];
    public rockQuestions: Array<string> = [];
}

export class Game {
    private state:GameState;    

    constructor(state?:GameState) {
        if(state){
            this.state = state
        }
        else{
            this.state = new GameState();
        }

        for (let i = 0; i < 50; i++) {
            this.state.popQuestions.push("Pop Question " + i);
            this.state.scienceQuestions.push("Science Question " + i);
            this.state.sportsQuestions.push("Sports Question " + i);
            this.state.rockQuestions.push(this.createRockQuestion(i));
          }
    }

    private createRockQuestion(index: number): string {
        return "Rock Question " + index;
    }

    public add(name: string): boolean {
        this.state.players.push(name);
        this.state.places[this.howManyPlayers()] = 0;
        this.state.purses[this.howManyPlayers()] = 0;
        this.state.inPenaltyBox[this.howManyPlayers()] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.state.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.state.players.length;
    }

    public roll(roll: number) {
        console.log(this.state.players[this.state.currentPlayer] + " is the current player");
        console.log("They have rolled a " + roll);
    
        if (this.state.inPenaltyBox[this.state.currentPlayer]) {
          if (roll % 2 != 0) {
            this.state.isGettingOutOfPenaltyBox = true;
    
            console.log(this.state.players[this.state.currentPlayer] + " is getting out of the penalty box");
            this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] + roll;
            if (this.state.places[this.state.currentPlayer] > 11) {
              this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] - 12;
            }
    
            console.log(this.state.players[this.state.currentPlayer] + "'s new location is " + this.state.places[this.state.currentPlayer]);
            console.log("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            console.log(this.state.players[this.state.currentPlayer] + " is not getting out of the penalty box");
            this.state.isGettingOutOfPenaltyBox = false;
          }
        } else {
    
          this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] + roll;
          if (this.state.places[this.state.currentPlayer] > 11) {
            this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] - 12;
          }
    
          console.log(this.state.players[this.state.currentPlayer] + "'s new location is " + this.state.places[this.state.currentPlayer]);
          console.log("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            console.log(this.state.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            console.log(this.state.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            console.log(this.state.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            console.log(this.state.rockQuestions.shift());
    }

    private currentCategory(): string {
        if (this.state.places[this.state.currentPlayer] == 0)
            return 'Pop';
        if (this.state.places[this.state.currentPlayer] == 4)
            return 'Pop';
        if (this.state.places[this.state.currentPlayer] == 8)
            return 'Pop';
        if (this.state.places[this.state.currentPlayer] == 1)
            return 'Science';
        if (this.state.places[this.state.currentPlayer] == 5)
            return 'Science';
        if (this.state.places[this.state.currentPlayer] == 9)
            return 'Science';
        if (this.state.places[this.state.currentPlayer] == 2)
            return 'Sports';
        if (this.state.places[this.state.currentPlayer] == 6)
            return 'Sports';
        if (this.state.places[this.state.currentPlayer] == 10)
            return 'Sports';
        return 'Rock';
    }

    private didPlayerWin(): boolean {
        return !(this.state.purses[this.state.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.state.players[this.state.currentPlayer] + " was sent to the penalty box");
        this.state.inPenaltyBox[this.state.currentPlayer] = true;
    
        this.state.currentPlayer += 1;
        if (this.state.currentPlayer == this.state.players.length)
            this.state.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.state.inPenaltyBox[this.state.currentPlayer]) {
            if (this.state.isGettingOutOfPenaltyBox) {
              console.log('Answer was correct!!!!');
              this.state.purses[this.state.currentPlayer] += 1;
              console.log(this.state.players[this.state.currentPlayer] + " now has " +
              this.state.purses[this.state.currentPlayer] + " Gold Coins.");
      
              var winner = this.didPlayerWin();
              this.state.currentPlayer += 1;
              if (this.state.currentPlayer == this.state.players.length)
                this.state.currentPlayer = 0;
      
              return winner;
            } else {
              this.state.currentPlayer += 1;
              if (this.state.currentPlayer == this.state.players.length)
                this.state.currentPlayer = 0;
              return true;
            }
      
      
          } else {
      
            console.log("Answer was corrent!!!!");
      
            this.state.purses[this.state.currentPlayer] += 1;
            console.log(this.state.players[this.state.currentPlayer] + " now has " +
                this.state.purses[this.state.currentPlayer] + " Gold Coins.");
      
            var winner = this.didPlayerWin();
      
            this.state.currentPlayer += 1;
            if (this.state.currentPlayer == this.state.players.length)
                this.state.currentPlayer = 0;
      
            return winner;
          }
    }

}
