// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati
// - abbiamo calpestato una bomba
// - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.
// BONUS:
// 1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// 2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste



const grid = document.getElementById('grid');
const scoreOutput = document.getElementById('score');
const levelSelectElement = document.getElementById('game-level');


document.querySelector('#play-btn').addEventListener('click', function() {
	addInnerHTMLContent(grid, '');
	addInnerHTMLContent(scoreOutput, '');
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
 * @returns a div cell element
 */
function generateGridCellElement (innerContent, cellsPerRow) {
	const gridCell = document.createElement('div');
	gridCell.classList.add('cell');
	gridCell.style.width = `calc(100% / ${cellsPerRow}`;
	gridCell.style.height = gridCell.style.width;
	addInnerHTMLContent(gridCell, `<span>${innerContent}</span>`);
	return gridCell;
}


/**
 * function that generates a game board
 * @returns a game board based on difficulty level selected
 */
function generateGame(){
	let cellsNumber;
	let cellsPerRow;
	let score = 0;
	let cellsClicked = 0;
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
	console.log(mines);
	for ( let i = 1; i <= cellsNumber; i++){
		const currentGridCell = generateGridCellElement(i, cellsPerRow);
		currentGridCell.addEventListener('click', function() {
			let isMine = false;
			if (!mines.includes(i)) { // se la cella cliccata non è una mina
				cellsClicked++;
				score++;
				addInnerHTMLContent(scoreOutput, `Your score is : ${score}`)
				currentGridCell.classList.add('clicked');
				if (cellsClicked == cellsNumber - 16){ // se si raggiunge il numero massimo possibile di numeri consentiti...
					addInnerHTMLContent(scoreOutput, `Game over ! Your score is : ${score} points`);
				}
			} else { 
				currentGridCell.classList.add('clicked-mine');
				addInnerHTMLContent(scoreOutput, `Game over ! Your score is : ${score} points`);
				isMine = true;
			}
			console.log(isMine);
			if (isMine) {
				//evitare che si possa cliccare su altre celle
				// il software scopre tutte le bombe nascoste
			}
		})
		grid.appendChild(currentGridCell);
	}
}

function gameOver() {

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
	while ( control == false ){
		uniqueRandomInt  = Math.floor(Math.random() * (max - min) + min);
		if ( !blacklist.includes(uniqueRandomInt)  ){
			control = true;
		}
	return uniqueRandomInt;
	}
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
		minesList.push(generateUniqueRandomInt(minesList, 0, cellsNumber));
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



