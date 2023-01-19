import './styles.css'
import CanvasSettings from './components/canvas/canvasSettings'
import Game from './components/game/game'
import MenuHandler from './components/menu/handlers'

window.addEventListener('load', () => {
  const canvasSettings = new CanvasSettings(innerWidth, 400, 'canvas')
  const menu = new MenuHandler(canvasSettings)

  let game 
  window.addEventListener('click', () => {
    if(!game || game.player.health <= 0) {
      game = new Game(canvasSettings)
    }
  })
  window.addEventListener('touchstart', () => {
    if(!game || game.player.health <= 0) {
      game = new Game(canvasSettings)
    }
  })

  let lastTimeStamp = 0
  function animate(timeStamp) {
    canvasSettings.clearCanvas()
    const deltaTime = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp

    if(game) {
      game.update(deltaTime)
    } else {
      menu.showStartScreen()
    }
    if(game && game.player.health <= 0) {
      game.gameOver()
    }
    requestAnimationFrame(animate)
  }
  animate(0)
})