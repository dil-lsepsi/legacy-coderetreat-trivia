import {expect} from 'chai';
import {describe, it, beforeEach, afterEach} from 'mocha';
import { Game, GameState } from '../src/game';

// Override console.log

describe('The test environment', () => {

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

    
});


