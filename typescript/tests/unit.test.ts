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
        const players = ["p1", "p2", "p3", "p4", "p5", "p6", "p7"];
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
        const expected = ["Answer was correct!","Player now has NaN Gold Coins."]
        expect(logs).to.deep.equal(expected);
    });

    it("should indicate correct answer from penalty", function () {
        const stateMock = new GameState();
        const game = new Game(stateMock);
        const player = "p1";
        game.add(player);
        stateMock.inPenaltyBox = [true]
        game.roll(3)
        inTest = true
        game.wasCorrectlyAnswered()
        const expected = ["Answer was correct!","p1 now has NaN Gold Coins."]
        expect(logs).to.deep.equal(expected);
    });

});


