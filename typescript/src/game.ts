export class GameState {
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
    public language: string = "en";
    public l: any = {}

}

const transaltions = {
    en: {
        popQuestion: "Pop Question",
        scineceQuestion: "Science Question",
        sportsQuestion: "Sports Question",
        rockQuestion: "Rock Question",
        wasAdded: "was added",
        theyPlayerAreNumber: "They are player number",
        isTheCurrentPlayer: "is the current player",
        isGettingOutOfPenaltyBox: "is getting out of the penalty box",
        theyHaveRolledA: "They have rolled a",
        sNewLocationIs: "'s new location is",
        theCategoryIs: "The category is",
        isNotGettingOutOfPenaltyBox: "is not getting out of the penalty box",
        questionWasIncorrectlyAnswered: 'Question was incorrectly answered',
        wasSentToPenaltyBox: "was sent to the penalty box",
       answerWasCorrect: 'Answer was correct!',
       nowHas: "now has",
      goldCoins: "Gold Coins",


    },
    de: {},
    hu: {},
    zh: {}
}

export class Game {
    private state: GameState;

    constructor(state?: GameState) {

        if (state) {
            this.state = state
        }
        else {
            this.state = new GameState();
        }
        this.state.l = transaltions[this.state.language]
        for (let i = 0; i < 50; i++) {
            this.state.popQuestions.push(this.state.l.popQuestion + " " + i);
            this.state.scienceQuestions.push(this.state.l.scineceQuestion + " " + i);
            this.state.sportsQuestions.push(this.state.l.sportsQuestion + " " + i);
            this.state.rockQuestions.push(this.state.l.rockQuestion + " " + i);
        }
    }

    public add(name: string): boolean {
        this.state.players.push(name);
        this.state.places[this.howManyPlayers() - 1] = 0;
        this.state.purses[this.howManyPlayers() - 1] = 0;
        this.state.inPenaltyBox[this.howManyPlayers()] = false;

        console.log(name + " " + this.state.l.wasAdded);
        console.log(this.state.l.theyPlayerAreNumber + " " + this.state.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.state.players.length;
    }

    public roll(roll: number) {
        console.log(this.state.players[this.state.currentPlayer] + " " + this.state.l.isTheCurrentPlayer);
        console.log(this.state.l.theyHaveRolledA + " " + roll);

        if (this.state.inPenaltyBox[this.state.currentPlayer]) {
            if (roll % 2 != 0) {
                this.state.isGettingOutOfPenaltyBox = true;

                console.log(this.state.players[this.state.currentPlayer] + " " + this.state.l.isGettingOutOfPenaltyBox);
                this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] + roll;
                if (this.state.places[this.state.currentPlayer] > 11) {
                    this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] - 12;
                }

                console.log(this.state.players[this.state.currentPlayer] + this.state.l.sNewLocationIs + " " + this.state.places[this.state.currentPlayer]);
                console.log(this.state.l.theCategoryIs + " " + this.currentCategory());
                this.askQuestion();
            } else {
                console.log(this.state.players[this.state.currentPlayer] + " " + this.state.l.isNotGettingOutOfThePenalty);
                this.state.isGettingOutOfPenaltyBox = false;
            }
        } else {

            this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] + roll;
            if (this.state.places[this.state.currentPlayer] > 11) {
                this.state.places[this.state.currentPlayer] = this.state.places[this.state.currentPlayer] - 12;
            }

            console.log(this.state.players[this.state.currentPlayer] + this.state.l.sNewLocationIs + " " + this.state.places[this.state.currentPlayer]);
            console.log(this.state.l.theCategoryIs + " " + this.currentCategory());
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
        console.log(this.state.l.questionWasIncorrectlyAnswered);
        console.log(this.state.players[this.state.currentPlayer] + " " + this.state.l.wasSentToPenaltyBox);
        this.state.inPenaltyBox[this.state.currentPlayer] = true;

        this.state.currentPlayer += 1;
        if (this.state.currentPlayer == this.state.players.length)
            this.state.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.state.inPenaltyBox[this.state.currentPlayer]) {
            if (this.state.isGettingOutOfPenaltyBox) {
                console.log(this.state.l.answerWasCorrect);
                this.state.purses[this.state.currentPlayer] += 1;
                console.log(this.state.players[this.state.currentPlayer] + " " + this.state.l.nowHas + " " +
                    this.state.purses[this.state.currentPlayer] + " " + this.state.l.goldCoins);

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

            console.log(this.state.l.answerWasCorrect);

            this.state.purses[this.state.currentPlayer] += 1;
            console.log(this.state.players[this.state.currentPlayer] + " " +  this.state.l.nowHas + " " +
                this.state.purses[this.state.currentPlayer] + " " + this.state.l.goldCoins + ".");

            var winner = this.didPlayerWin();

            this.state.currentPlayer += 1;
            if (this.state.currentPlayer == this.state.players.length)
                this.state.currentPlayer = 0;

            return winner;
        }
    }

}
