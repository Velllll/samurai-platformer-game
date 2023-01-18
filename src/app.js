import './styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import Game from './components/game/game'

window.addEventListener('load', () => {
  const canvasSettings = new CanvasSettings(innerWidth, 400, 'canvas')

  let game
  const playButton = document.getElementById('play')
  playButton.onclick = () => {
    game = new Game(canvasSettings)
  }

  let lastTimeStamp = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp

    if(game) {
      game.update(deltaTime)
    } else {
      canvasSettings.showStartScreen()
    }
    if(game && game.player.health <= 0) {
      game.gameOver()
    }
    requestAnimationFrame(animate)
  }
  animate(0)
})