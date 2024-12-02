import {expect} from 'chai';
import {describe, it, beforeEach, afterEach} from 'mocha';
import {GameRunner} from '../src/game-runner';
import { Game } from '../src/game';

const originalConsoleLog = console.log;
const logs:any[] = []
let inTest = false

// Override console.log

describe('The test environment', () => {
    beforeEach(()=>{
        console.log = (...args: any[]) => {
            if(inTest){
                logs.push(args)
            }
            
            originalConsoleLog("Overridden Log:", ...args);
        };
    })

    afterEach(()=>{
        inTest = false
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
});


