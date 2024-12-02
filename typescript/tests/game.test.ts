import {expect} from 'chai';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {GameRunner} from '../src/game-runner';
import { Game } from '../src/game';

const originalConsoleLog = console.log;
let logs:any[] = []
let inTest = false

// Override console.log

describe('The test environment', () => {
    beforeEach(()=>{
        console.log = (arg: any[]) => {
            if(inTest){
                logs.push(arg)
            }
            
            originalConsoleLog("Overridden Log:", arg);
        };
    })

    afterEach(()=>{
        inTest = false
        logs = []
        
        console.log = originalConsoleLog
    })

    it('should pass', () => {
        expect(true).to.be.true;
    });

    it("should access game", function () {
        expect(GameRunner).to.not.be.undefined;
    });

    it("should add player", function () {
        inTest = true
        const game = new Game();
        game.add("Player")
        const expected = ["Player was added","They are player number 1"]
        expect(logs).to.deep.equal(expected);
    });
    it("should indicate wrong answer", function () {
        const game = new Game();
        game.add("Player")

        inTest = true
        game.wrongAnswer()
        const expected = ["Question was incorrectly answered","Player was sent to the penalty box"]
        expect(logs).to.deep.equal(expected);
    });

    it("should indicate correct answer", function () {
        const game = new Game();
        game.add("Player")

        inTest = true
        game.wasCorrectlyAnswered()
        const expected = ["Answer was corrent!!!!","Player now has NaN Gold Coins."]
        expect(logs).to.deep.equal(expected);
    });

    
});


