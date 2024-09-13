import './assets/css/style.css'
import { Game } from "./assets/js/Game"

document.querySelector('#app').innerHTML = `
	<section id="gameBoard" class="gameBoard"></section>
	<section class="gameMenu">
		<section class="welcome">
			<header>
				<h1>Tetris Game</h1>
			</header>
			<footer>
				<button class="btn-help">Help</button>
				<button class="btn-new-game">Play now</button>
			</footer>
		</section>

		<section class="gameOver hide">
			<header>
				<h1>Game Over</h1>
			</header>
			<p id="finalScore"></p>
			<footer>
				<button class="btn-help">Help</button>
				<button class="btn-new-game">Play again</button>
			</footer>
		</section>

		<section class="help hide">
			<fieldset>
				<legend>Helps</legend>
				
				<p>
					- <abbr title="Arrow Up"><mark>&UpArrow;</mark></abbr>: Rotate block.
				</p>
				<p>
					- <abbr title="Arrow Down"><mark>&DownArrow;</mark></abbr>: Speed up.
				</p>
				<p>
					- <abbr title="Arrow Left"><mark>&LeftArrow;</mark></abbr>: Move left.
				</p>
				<p>
					- <abbr title="Arrow Right"><mark>&RightArrow;</mark></abbr>: Move right.
				</p>
			</fieldset>
			<label class="btn-back">
				<span>&LeftArrow;</span> Go Back
			</label>
		</section>
	</section>
`

new Game()