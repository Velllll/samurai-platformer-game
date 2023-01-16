window.addEventListener('load', () => {
  class CanvasSettings {
    constructor(canvasWidth, canvasHeight, canvasId) {
      this.width = canvasWidth
      this.height = canvasHeight
      this.canvasId = canvasId

      this.canvas = document.getElementById(this.canvasId)
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.ctx = this.canvas.getContext('2d')
    }

    clearCanvas() {
      this.ctx.clearRect(0, 0, this.width, this.height)
    }
  }

  class Player {
    frameX = 0
    frameY = 0
    frameCounter = 0

    velocity = 0
    weight = .5

    constructor(spriteWidth, spriteHeight, playerWidth, playerHeight, maxFrames, playerSpeed, x, y, imageSrc, canvasSettings, playerHandler) {
      this.spriteWidth = spriteWidth
      this.spriteHeight = spriteHeight
      this.playerWidth = playerWidth
      this.playerHeight = playerHeight
      this.maxFrames = maxFrames
      this.playerSpeed = playerSpeed
      this.image = new Image()
      this.image.src = imageSrc
      this.canvasSettings = canvasSettings
      this.x = x
      this.y = y
      this.playerHandler = playerHandler
    }

    update() {
      this.#handleKeys()
      this.#draw()
      this.#updateFrames()
    }

    #draw() {
      this.canvasSettings.ctx.drawImage(
        this.image,
        this.spriteWidth * this.frameX,
        this.spriteHeight * this.frameY,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.playerWidth,
        this.playerHeight
      )
    }

    #handleKeys() {
      this.y -= this.velocity
      this.playerHandler.keys.forEach(k => {
        if(k === 'ArrowUp' && this.#OnGround()) {
          this.velocity = 17
        }
      }) 
      if(!this.#OnGround()) {
        this.velocity -= this.weight
      } else {
        this.y = 230
      }
    }

    #OnGround() {
      return this.y >= 230
    } 

    #updateFrames() {
      if(this.frameCounter % this.playerSpeed === 0) this.frameX++
      if(this.frameX > this.maxFrames) this.frameX = 0
      this.frameCounter++
    }
  }

  class PlayerHandler {
    keys = []

    constructor(canvasSettings) {
      this.canvasSettings = canvasSettings

      this.#addKeys()
    }

    #addKeys() {
      window.addEventListener('keydown', (e) => {
        if(e.key === 'ArrowUp' && !this.keys.includes('ArrowUp')) {
          this.keys.push('ArrowUp')
        }
        if(e.code === 'Space' && !this.keys.includes('Space')) {
          this.keys.push('Space')
        }
      })

      window.addEventListener('keyup', (e) => {
        if(e.key === 'ArrowUp') {
          this.keys = this.keys.filter(k => k !== 'ArrowUp')
        }
        if(e.code === 'Space') {
          this.keys = this.keys.filter(k => k !== 'Space')
        }
      })
    }
  }

  class Enemy {
    constructor() {
      
    }
  }

  class Background {
    constructor(width, height, imageSrc, speed, canvasSettings) {
      this.width = width
      this.height = height
      this.speed = speed
      this.canvasSettings = canvasSettings
      this.image = new Image()
      this.image.src = imageSrc

      this.x = 0
      this.y = 0
    }

    update() {
      this.#draw()
      this.#handleXPosition()
    }

    #draw() {
      for (let i = 0; i < 3; i++) {
        this.canvasSettings.ctx.drawImage(
          this.image,
          this.x + this.width * i - this.speed,
          this.y
        )
      }
    }

    #handleXPosition() {
      this.x -= this.speed
      if(this.x <= -this.width) {
        this.x = 0
      }
    }
  }

  class Game {
    constructor(canvasSettings) {
      this.canvasSettings = canvasSettings

      this.backgroundSky = new Background(970, 400, '../assets/background.png', 3, this.canvasSettings)
      this.backgroundClouds = new Background(970, 400, '../assets/clouds.png', 4, this.canvasSettings)

      this.playerHandler = new PlayerHandler(this.canvasSettings)
      this.player = new Player(200, 200, 250, 250, 7, 4, 100, 230, '../assets/Run.png', this.canvasSettings, this.playerHandler)
    }

    update(deltaTime) {
      this.backgroundSky.update()
      this.backgroundClouds.update()
      this.player.update()
    }
  }

  const canvasSettings = new CanvasSettings(innerWidth, 400, 'canvas')
  const game = new Game(canvasSettings)

  let lastTimeStamp = 0
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTimeStamp
    lastTimeStamp = timeStamp

    game.update(deltaTime)
    requestAnimationFrame(animate)
  }
  animate(0)
})