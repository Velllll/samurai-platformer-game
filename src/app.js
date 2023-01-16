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
    constructor() {
      
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
    }

    update(deltaTime) {
      this.backgroundSky.update()
      this.backgroundClouds.update()
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