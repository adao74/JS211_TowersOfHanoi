let stone = null;

// this function is called when a row is clicked. 
const selectRow = (row) => {
  const currentRow = row.getAttribute("data-row")

  console.log("Yay, we clicked an item", row)
  console.log("Here is the stone's id: ", row.id)
  console.log("Here is the stone's data-size: ", currentRow)
  console.log(!stone)

  if (!stone) {
    pickUpStone(row.id)
  } else {
    dropStone(row.id)
  }
} 

// this function can be called to get the last stone in the stack
const pickUpStone = (rowID, stoneID) => {
  console.log("picking up stone!!")

  const selectedRow = document.getElementById(rowID);

  if (selectedRow) {
    
    // don't use lastChild() b/c that would remove the last node, but you want to remove the last element (there are nodes that aren't elements)
    stone = selectedRow.removeChild(selectedRow.lastElementChild);
    
    console.log(selectedRow)
    console.log(stone);
  } else {
      console.log('Element with ID ' + rowID + ' not found.');
  }

}

// Once you figure that out you'll need to figure out if its a legal move...
const dropStone = (rowID) => {
  console.log("dropping the stone!!")
  
  document.getElementById(rowID).appendChild(stone)
  stone = null
}

// * Remember you can use your logic from 'main.js' to maintain the rules of the game. But how? Follow the flow of data just like falling dominoes.

