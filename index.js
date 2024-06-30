let numMoves = 0;
let stone = null;
let stoneID;
let savedRow;

// this function is called when a row is clicked. 
const selectRow = (row) => {
  numMoves++;
  console.log(`Number of moves: ${numMoves}`)

  savedRow = row;

  if (!stone) {
    pickUpStone()
  } else {
    dropStone()
    checkForWin()
  }
} 

// this function can be called to get the last stone in the stack
const pickUpStone = () => {

  if (savedRow.lastElementChild) {
    console.log("Picking up stone!!")

    // don't use lastChild() b/c that would remove the last node, but you want to remove the last element (there are nodes that aren't elements)
    stone = savedRow.removeChild(savedRow.lastElementChild);
    stoneID = parseInt(stone.id)

    console.log(`Stone ID is: ${stoneID}`)

  } else {
      console.log('No stone to pick up. Try again');
  }

}

const dropStone = () => {
  console.log("Dropping the stone!!")
  
  if ( isLegal() ) {
    savedRow.appendChild(stone)
    stone = null
  } else {
    console.log("Not a legal move. Try again.")
  }

}

const isLegal = () => {
  
  const stone2 = savedRow.lastElementChild // null if column empty

  let numOfLast;

  if (stone2) {
    numOfLast = parseInt(stone2.id)
  } else { // for empty columns
    numOfLast = 5;
  }

  if (numOfLast > stoneID )
    return true
  else {
    return false
  }
}

const checkForWin = () => {
  
  if ( ( savedRow.getAttribute("data-row") === "top" || savedRow.getAttribute("data-row") === "middle" ) && (savedRow.childElementCount === 4 )) {
    window.alert(`You won in ${numMoves} moves!`)
    window.location.reload(true); // refreshing the window resets everything (html page, numMoves)
  }
}
