'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

let endStack;
let startStack;

// Next, what do you think this function should do?
const movePiece = () => {
  
  // Take the rightmost piece from the startStack
  let lastStartStack = stacks[startStack].pop() // returns last element AND changes stacks
  
  // Place it on the endStack
  stacks[endStack].push(lastStartStack)
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = () => {
  // Your code here

  let endStackArray = stacks[endStack]  // ending array 
  let lastEndStack = endStackArray[endStackArray.length - 1]  // last piece in the ending array
  

  let startStackArray = stacks[startStack] // starting array 
  let lastStartStack = startStackArray[startStackArray.length - 1] // last piece in the starting array

  if (  (lastEndStack > lastStartStack) || stacks[endStack].length == 0 ) { 
    return true
  } else {
    return false
  }


}

// What is a win in Towers of Hanoi? When should this function run?
const checkForWin = () => {
  // Your code here
  for (let letter in stacks) {

    if ( (endStack === 'b' || endStack === 'c') && (stacks[letter].length == 4)) {
      console.log("You win!")
      return true
    }
  }

  return false 
}

// When is this function called? What should it do with its argument?
const towersOfHanoi = (a, b) => {
  // Your code here

  startStack = a;
  endStack = b;

  if (isLegal()) {
    movePiece(startStack, endStack);
  } else {
    console.log("Move not legal")
  }

}

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (a) => {
    rl.question('end stack: ', (b) => {
      towersOfHanoi(a, b);
      if (!checkForWin()) {
        getPrompt();
      }
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
