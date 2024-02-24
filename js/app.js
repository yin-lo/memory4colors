/**
 *
 * Code fourni
 */
const app = {
	// just a utility var to remember all the colors
	colors: ['red', 'green', 'blue', 'yellow'],

	// this var will contain the sequence said by Simon
	sequence: [],
	indice: 0,
	timeoutID: undefined,

	drawCells: function () {
		const playground = document.getElementById('playground');
		for (const color of app.colors) {
			let cell = document.createElement('div');
			cell.className = 'cell';
			cell.id = color;
			cell.style.backgroundColor = color;
			playground.appendChild(cell);
		}
	},

	bumpCell: function (color) {
		// let's modify the style directly
		document.getElementById(color).style.borderWidth = '45px';
		// and reset the same style, after a small pause (150 ms)
		setTimeout(() => {
			document.getElementById(color).style.borderWidth = '0';
		}, 150);
	},

	newGame: function () {
		app.removeSecurity();
		// start by reseting the sequence
		app.sequence = [];
		app.indice = 0;
		console.log(app.sequence);
		console.log(app.indice);
		// make it 3 times :
		for (let index = 0; index < 3; index++) {
			// get a random number between 0 and 3
			let random = Math.floor(Math.random() * 4);
			// add the corresponding color to the sequence
			app.sequence.push(app.colors[random]);
		}
		console.log(app.sequence);

		// start the "Simon Says" sequence
		app.simonSays(app.sequence);
	},

	displaySecurity: function () {
		const elemSecurity = document.querySelector(".security");
		elemSecurity.classList.add("visible");
	},

	removeSecurity: function () {
		const elemSecurity = document.querySelector(".security");
		elemSecurity.classList.remove("visible");
	},

	simonSays: function (sequence) {
		app.showMessage('Mémorisez la séquence');
		if (sequence && sequence.length) {
			app.displaySecurity();
			// after 500ms, bump the first cell
			setTimeout(app.bumpCell, 500, sequence[0]);
			// plays the rest of the sequence after a longer pause
			setTimeout(app.simonSays, 850, sequence.slice(1));
		} else {
			app.removeSecurity();
			app.showMessage('Reproduisez la séquence');
			app.timeoutID = setTimeout(app.endGame, 5000);
		}
	},

	init: function () {
		console.log('init');
		app.drawCells();
		app.playerRepeat();

		// listen click on the "go" button
		document.getElementById('go').addEventListener('click', app.newGame);
	},

	/** Fin du code fourni. Après, c'est à toi de jouer! */

	showMessage: function (message) {
		const btnPlay = document.querySelector('#go');
		btnPlay.style.display = 'none';
		document.getElementById('message').innerHTML = message;
	},

	displayBtnPlay: function () {
		const btnPlay = document.querySelector('#go');
		btnPlay.style.display = null;
		document.getElementById('message').innerHTML = null;
	},

	endGame: function () {
		app.displaySecurity();
		const messageEndGame = `Partie terminée. Votre score : ${app.sequence.length}`;
		app.showMessage(messageEndGame);
		setTimeout(app.displayBtnPlay, 5000);
	},

	playerRepeat: function () {
		const cells = document.querySelectorAll('.cell');
		cells.forEach((cell) => {
			cell.addEventListener('click', (e) => {
				const color = e.target.id;
				app.bumpCell(color);
				clearTimeout(app.timeoutID);
				if (color === app.sequence[app.indice]) {
					app.indice++;
					console.log(app.indice);
					app.timeoutID = setTimeout(app.endGame, 5000);
					if (app.indice === app.sequence.length) {
						clearTimeout(app.timeoutID);
						app.nextMove();
					}
				} else {
					app.endGame();
				}
			});
		});
	},

	nextMove: function () {
		const random = Math.floor(Math.random() * 4);
		app.sequence.push(app.colors[random]);
		app.simonSays(app.sequence);
		app.indice = 0;
	},
};

document.addEventListener('DOMContentLoaded', app.init);
