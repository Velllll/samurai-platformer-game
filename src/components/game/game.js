import background from '../../assets/background.png'
import clouds from '../../assets/clouds.png'
import heart from '../../assets/heart.png'
import dragon from '../../assets/dragon.png'
import suriken from '../../assets/suriken.png'

import PlayerHandler from '../../components/player/playerHandler'
import Player from '../../components/player/player'
import Background from '../background/background'
import Heart from './heart'
import Enemy from '../enemies/enemy'
import Obstacle from '../enemies/obstacle'

export default class Game {
  enemys = []
  obstacles = []

  nextObstacleSpawn = 200
  obstacleTimeCounter = 0

  nextEnemySpawn = 500
  enemyTimeCounter = 0

  score = 0

  gameDifficulty = 1

  constructor(canvasSettings) {
    this.canvasSettings = canvasSettings

    this.backgroundSky = new Background(970, 400, background, 3, this.canvasSettings)
    this.backgroundClouds = new Background(970, 400, clouds, 4, this.canvasSettings)
    this.playerHandler = new PlayerHandler(this.canvasSettings)
    this.player = new Player(200, 200, 250, 250, 4, 100, 230, this.canvasSettings, this.playerHandler)
    this.heart = new Heart(32, 32, heart, 20, 70, this.canvasSettings)
  }

  update(deltaTime) {
    this.#render()
    this.#handlerEnemysAndObstacles(deltaTime)
    this.#updateGameDifficulty(deltaTime)

    if(this.player.OnGround()) {
      this.player.gotDamageInAir = false
    }
  }

  #updateGameDifficulty(deltaTime) {
    this.gameDifficulty += deltaTime / 1000
  }

  #render() {
    this.backgroundSky.update()
    this.backgroundClouds.update()
    this.enemys.forEach(e => e.update())
    this.obstacles.forEach(o => o.update())
    this.player.update()
    this.heart.draw(this.player.health)
    this.#showScore()
  }

  #handlerEnemysAndObstacles(deltaTime) {
    this.#addEnemy(deltaTime)
    this.#addObstacle(deltaTime)

    this.#checkPlayerAndEnemyCollided()
    this.#checkPlayerAndObstacleCollided()
  }

  #addEnemy(deltaTime) {
    this.enemyTimeCounter += deltaTime
    if(this.enemyTimeCounter >= this.nextEnemySpawn) {
      const enemy = new Enemy(410, 80, 410, 80, 4, dragon, 8, this.canvasSettings)
      this.enemys.push(enemy)
      this.enemyTimeCounter = 0
      this.nextEnemySpawn = Math.random() * 1800 + 1200
    }
  }

  #addObstacle(deltaTime) {
    this.obstacleTimeCounter += deltaTime
    if(this.obstacleTimeCounter >= this.nextObstacleSpawn) {
      const surikens = new Obstacle(100, 100, 50, 50, suriken, Math.random() * 2 + 6 + this.gameDifficulty, 340 - Math.random() * 40, 2, this.canvasSettings) 
      this.obstacles.push(surikens)
      this.obstacleTimeCounter = 0
      this.nextObstacleSpawn = Math.random() * 500 + 700
    }
  }

  #checkPlayerAndEnemyCollided() {
    const player = {x: this.player.x + 100, y: this.player.y + 100, w: this.player.playerWidth - 200, h: this.player.playerHeight - 200}
    this.enemys.forEach(e => {
      const enemy = {x: e.x, y: e.y, w: e.width, h: e.height}
      if(this.#rectCollisionDetection(player, enemy)) {
        if(this.player.attack) {
          this.#removeEnemy(enemy)
          this.score++
        } else {
          this.player.getDamage()
        }
      }
    })
  }

  #checkPlayerAndObstacleCollided() {
    const player = {x: this.player.x + 100, y: this.player.y + 100, w: this.player.playerWidth - 200, h: this.player.playerHeight - 200}
    this.obstacles.forEach(o => {
      const obstacle = {x: o.x, y: o.y, w: o.width, h: o.height}
      if(this.#rectCollisionDetection(player, obstacle)) {
        this.#removeObstacles(obstacle)
        this.player.health--
      }
    })
  }

  /**
   * 
   * @type {x: number, y: number, w: number, h: number} rect1 
   * @type {x: number, y: number, w: number, h: number} rect2 
   */
  #rectCollisionDetection(rect1, rect2) {
    if (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.h + rect1.y > rect2.y
    ) {
      return true
    } else {
      return false
    }
  }

  #removeEnemy(enemy) {
    this.enemys = [...this.enemys].filter(e => e.y !== enemy.y)
  }

  #removeObstacles(obstacle) {
    this.obstacles = [...this.obstacles].filter(o => o.y !== obstacle.y)
  } 

  gameOver() {
    this.canvasSettings.ctx.fillRect(0, 0, this.canvasSettings.width, this.canvasSettings.height)
    this.canvasSettings.ctx.fillStyle = "#fff";
    this.canvasSettings.ctx.fillText("GAME OVER", this.canvasSettings.width / 2 - 70, this.canvasSettings.height / 2 - 20)
    this.canvasSettings.ctx.fillText(`Score: ${this.score}`, 20, 40)
    this.canvasSettings.ctx.fillStyle = "#000";

  }

  #showScore() {
    this.canvasSettings.ctx.fillText(`Score: ${this.score}`, 20, 40)
  }
}