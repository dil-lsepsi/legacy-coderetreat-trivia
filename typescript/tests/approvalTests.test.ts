import * as approvals from "approvals"
import { Game } from "../src/game";
approvals.mocha();

const originalConsoleLog = console.log;
let logs:any[] = []
let inTest = false

describe("When running some tests", function () {
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

  it("should be able to use Approvals", function () {
    var data = "Hello World!";
    this.verify(data); // or this.verifyAsJSON(data)
  });


  it("add player approval", function () {
    inTest = true
    const game = new Game();
    game.add("Player")
    this.verify(JSON.stringify(logs))
});


it("add multiple player approval", function () {
  inTest = true
  const game = new Game();
  const players = [
    "player1","player2","player3","player4","player5","player6","player7",
  ]
  players.forEach(p => game.add(p));
  this.verify(JSON.stringify(logs))
});


});