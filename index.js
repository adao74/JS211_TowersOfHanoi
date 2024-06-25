let stone = null;
let stoneID;

// this function is called when a row is clicked. 
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")

  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)

  if (!stone) {
    pickUpStone(row.id)
  } else {
    dropStone(row.id)
  }
} 

// this function can be called to get the last stone in the stack
const pickUpStone = (rowID) => {
  console.log("picking up stone!!")

  const selectedRow = document.getElementById(rowID);

  if (selectedRow) {
    
    // don't use lastChild() b/c that would remove the last node, but you want to remove the last element (there are nodes that aren't elements)
    stone = selectedRow.removeChild(selectedRow.lastElementChild);
    stoneID = parseInt(stone.id)

    console.log(selectedRow)
    console.log(stone)
    console.log(stoneID)

  } else {
      console.log('Element with ID ' + rowID + ' not found.');
  }

}

// Once you figure that out you'll need to figure out if its a legal move...
const dropStone = (rowID) => {
  console.log("You are trying to drop the stone!!")
  
  if ( isLegal(rowID) ) {
    document.getElementById(rowID).appendChild(stone)
    stone = null
  } else {
    console.log("Not a legal move. Try again.")
  }

}

const isLegal = (rowID) => {
  
  const stone2 = document.getElementById(rowID).lastElementChild // null if column empty

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

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

