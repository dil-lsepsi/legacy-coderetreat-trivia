import { expect } from 'chai';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { Game, GameState } from '../src/game';

// Override console.log

describe('The test environment', () => {
    const originalConsoleLog = console.log;
    let logs: any[] = []
    let inTest = false

    // Override console.log

    beforeEach(() => {
        console.log = (arg: any[]) => {
            if (inTest) {
                logs.push(arg)
            }

            originalConsoleLog("Overridden Log:", arg);
        };
    })

    afterEach(() => {
        inTest = false
        logs = []

        console.log = originalConsoleLog
    })

    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should add player", function () {
        const stateMock = new GameState();
        const game = new Game(stateMock);
        const player = "p1";
        game.add(player);
        expect(stateMock.players[0]).to.equal(player);
    });

    it("should add many players", function () {
        const stateMock = new GameState();
        const game = new Game(stateMock);
        const players = ["p1", "p2", "p3", "p4", "p5", "p6", "p7","p1", "p2", "p3", "p4", "p5", "p6", "p7"];
        const playerNum = players.length;
        players.forEach(p => game.add(p));
        expect(stateMock.players.length).to.equal(playerNum);
        expect(stateMock.players).to.deep.equal(players);
    });


    it("should reach all place types", function () {
        const stateMock = new GameState();
        const game = new Game(stateMock);
        const player = "p1";
        game.add(player);

    });

    it("should indicate correct answer", function () {
        const game = new Game();
        game.add("Player")

        inTest = true
        game.wasCorrectlyAnswered()
        const expected = ["Answer was correct!","Player now has 1 Gold Coins."]
        expect(logs).to.deep.equal(expected);
    });

    it("should indicate game end if player wins", function () {
        return
        inTest = true

        const game = new Game();
        const player = "Player";

        game.add("Player")

        const expected = `Game end`
        expect(logs).to.equal(expected);
    });

    it("should indicate correct answer from penalty", function () {
        const stateMock = new GameState();
        const game = new Game(stateMock);
        const player = "p1";
        game.add(player);
        stateMock.inPenaltyBox = [true]
        inTest = true
        game.roll(3)
        game.wasCorrectlyAnswered()
        const expected =  ["p1 is the current player","They have rolled a 3","p1 is getting out of the penalty box","p1's new location is 3","The category is Rock",
            "Rock Question 0","Answer was correct!","p1 now has 1 Gold Coins."]
        expect(logs).to.deep.equal(expected);
    });

});


