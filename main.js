var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; //current guess (attempt number)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "RAISE";

window.onload = function(){
    intialize();
}
function intialize(){

    // create game board
    for (let r = 0; r < height; r++){
        for (let c = 0; c < width; c++){
            //<span id ="0-0" class="tile"></span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("game").appendChild(tile);
        }
    }

//listen for key press
document.addEventListener("keyup", (e) => {
    if (gameOver) return;

    // alert(e.code) = to know what is being pressed on keyboard
    if ("KeyA" <= e.code && e.code <= "KeyZ"){
        if (col < width) {
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            if (currTile.innerText == ""){
                currTile.innerText = e.code[3]; //only want the letter of the key pressed, not "KeyA". 
                col += 1;
            }
        }
    }
    // if column 5 is reached, be able to backspace if needed.
    else if(e.code == "Backspace"){
        if ( 0 < col && col <= width){
            col -= 1;
        }
        let currTile = document.getElementById(row.toString() + "-" + col.toString());
        currTile.innerText = "";
    }
    //press enter to see if word is correct 
    else if (e.code == "Enter"){
    update();
    row += 1; //start new row 
    col = 0; //start at 0 for new row
    }

    if (!gameOver && row == height){
        gameOver = true;
        document.getElementById("answer").innerText = word;
    } 
})
}

function update(){
    let correct = 0;
    for (let c = 0; c < width; c++){
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

    // Is it in the correct position?
    if (word[c] == letter ){
        currTile.classList.add("correct");
        correct += 1;
    } //Is is in the word?
    else if (word.includes(letter)){
        currTile.classList.add("present");
    } // Not in the word
    else {
        currTile.classList.add("absent");
    }
    if (correct == width){
        gameOver = true;
    }
} 
}