const grid = document.getElementById('grid');
const scoreOutput = document.getElementById('score');
const levelSelectElement = document.getElementById('game-level');


document.querySelector('#play-btn').addEventListener('click', function() {
	generateGame();
})

document.getElementById('reset-btn').addEventListener('click', function() {
	addInnerHTMLContent(grid, '');
	addInnerHTMLContent(scoreOutput, '');
	levelSelectElement.value = "Choose a difficulty level";
})



// ! FUNCTIONS below ! //

/**
 * function that creates a div cell as a dom element
 * @param {*} innerContent inner html content of the div cell, wrapped by a span tag
 * @param {*} cellsPerRow number of cells in a row
 * @returns a div cell element
 */
function generateGridCellElement (innerContent, cellsPerRow) {
	const gridCell = document.createElement('div');
	gridCell.classList.add('cell');
	gridCell.style.width = `calc(100% / ${cellsPerRow}`;
	gridCell.style.height = gridCell.style.width;
	addInnerHTMLContent(gridCell, `${innerContent}`);
	return gridCell;
}


/**
 * function that generates a game board
 * @returns a game board based on difficulty level selected
 */
function generateGame(){
	let isGameOver = false;
	let cellsNumber;
	let cellsPerRow;
	let score = 0;
	addInnerHTMLContent(grid, '');
	addInnerHTMLContent(scoreOutput, '');
	switch(parseInt(levelSelectElement.value)){
		case 1 :
			cellsNumber = 100;
			break;
		case 2 :
			cellsNumber = 81;
			break;
		case 3 :
			cellsNumber = 49;
			break;
		default :
		addInnerHTMLContent(scoreOutput, 'Please select a level, then press play');
	}
	cellsPerRow = Math.sqrt(cellsNumber);
	let mines = generateMines(16, cellsNumber);
	for ( let i = 1; i <= cellsNumber; i++){
		const currentGridCell = generateGridCellElement(i, cellsPerRow);
		currentGridCell.addEventListener('click', function() {
			if( !isGameOver){
				if (!mines.includes(i)) { // if the clicked cell is not a mine..
					score++;
					addInnerHTMLContent(scoreOutput, `Your score is : ${score}`)
					currentGridCell.classList.add('clicked');
				} else {
					isGameOver = true; // otherwise game is over and..
					addInnerHTMLContent(scoreOutput, `Game over ! Your score is : ${score} points`);
					for ( let i = 0; i < grid.children.length ; i++){ // every cell, which is a mine, ... explodes!
						if( mines.includes(parseInt(grid.children[i].innerHTML)) ) {
							grid.children[i].innerHTML = `<img class="bg-danger" src="img/bomb.png" alt="bomb image">`;
						}
					}
				}
			}
		}, { once : true });
		grid.appendChild(currentGridCell);
	}
}


/**Function that creates a unique random integer between two values
 * 
 * @param {*} blacklist list where to check if the integer created already exists
 * @param {*} min minimum value of the random integer 
 * @param {*} max maximum value of the random integer 
 * @returns a unique random integer between a min and a max value, not included in the given blacklist
 */
function generateUniqueRandomInt (blacklist, min, max) {
	let control = false;
	let uniqueRandomInt;
	while ( !control ){
		uniqueRandomInt  = Math.floor(Math.random() * ((max + 1) - min) + min);
		if ( !blacklist.includes(uniqueRandomInt)  ){
			control = true;
		}
	}
	return uniqueRandomInt;
}


/**
 * Function that generates a list of mines
 * @param {*} minesNumber number of mines
 * @param {*} cellsNumber number of cells
 * @returns a list of mines with n random and unique integers
 */
function generateMines (minesNumber, cellsNumber) {
	const minesList = [];
	for ( let i = 0; i < minesNumber; i++){
		minesList.push(generateUniqueRandomInt(minesList, 1, cellsNumber));
	}
	return minesList;
}


/**Function that adds HTML content inside DOM Element inner HTML
 * 
 * @param {*} DOMElement dom element where to add content
 * @param {*} content content that will be added
 * @returns the addition of content inside the dom element inner html
 */
function addInnerHTMLContent (DOMElement, content) {
	return DOMElement.innerHTML = content;
}