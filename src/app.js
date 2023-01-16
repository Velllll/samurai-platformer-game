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
    frameCounter = 0

    velocity = 0
    weight = .5

    attack = false

    movement = {
      run: {
        src: '../assets/Run.png',
        maxFrames: 7
      },
      attack: {
        src: '../assets/Attack2.png',
        maxFrames: 5
      },
      jump: {
        src: '../assets/Jump.png',
        maxFrames: 1
      }
    }

    constructor(spriteWidth, spriteHeight, playerWidth, playerHeight, playerSpeed, x, y, canvasSettings, playerHandler) {
      this.spriteWidth = spriteWidth
      this.spriteHeight = spriteHeight
      this.playerWidth = playerWidth
      this.playerHeight = playerHeight
      this.playerSpeed = playerSpeed
      this.canvasSettings = canvasSettings
      this.x = x
      this.y = y
      this.playerHandler = playerHandler

      this.image = new Image()
      this.image.src = this.movement.run.src
      this.maxFrames = this.movement.run.maxFrames
    }

    update() {
      this.#handleKeys()
      this.#draw()
      this.#updateFrames()
    }

    #draw() {
      this.canvasSettings.ctx.strokeRect(this.x, this.y, this.playerWidth, this.playerHeight)
      this.canvasSettings.ctx.drawImage(
        this.image,
        this.spriteWidth * this.frameX,
        0,
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
        if(k === 'Space' && !this.#OnGround()) {
          this.attack = true
          this.image.src = this.movement.attack.src
          this.maxFrames = this.movement.attack.maxFrames
        }
      }) 

      this.#handelJump()
    }

    #OnGround() {
      return this.y >= 230
    } 

    #handelJump() {
      if(!this.#OnGround()) {
        this.velocity -= this.weight
      }
      if(!this.#OnGround() && !this.attack) {
        this.image.src = this.movement.jump.src
        this.maxFrames = this.movement.jump.maxFrames
      } 
      if(!this.#OnGround() && this.attack) {
        this.image.src = this.movement.attack.src
        this.maxFrames = this.movement.attack.maxFrames
      } 
      if(this.#OnGround()) {
        this.y = 230
        this.attack = false
        this.image.src = this.movement.run.src
        this.maxFrames = this.movement.run.maxFrames
      }
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
    frameCounter = 0
    frame = 0

    constructor(spriteWidth, spriteHeight, width, height, maxFrames, imageSrc, speed, canvasSettings) {
      this.spriteWidth = spriteWidth
      this.spriteHeight = spriteHeight
      this.width = width
      this.height = height
      this.maxFrames = maxFrames
      this.canvasSettings = canvasSettings
      this.image = new Image()
      this.image.src = imageSrc
      this.speed = speed

      this.x = this.canvasSettings.width
      this.y = Math.random() * 150
    }

    update() {
      this.x -= this.speed
      this.#draw()
      this.#updateFrames()
    }

    #draw() {
      this.canvasSettings.ctx.drawImage(
        this.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x, 
        this.y,
        this.width,
        this.height
      )
    }

    #updateFrames() {
      if(this.frameCounter % this.speed === 0) this.frame++
      if(this.frame > this.maxFrames) this.frame = 0
      this.frameCounter++
    }
  }

  class Obstacle {
    frame = 0
    frameCounter = 0

    constructor(spriteWidth, spriteHeight, width, height, imageSrc, speed, y, maxFrames, canvasSettings) {
      this.spriteWidth = spriteWidth
      this.spriteHeight = spriteHeight
      this.width = width
      this.height = height
      this.canvasSettings = canvasSettings
      this.image = new Image()
      this.image.src = imageSrc
      this.y = y
      this.maxFrames = maxFrames
      this.speed = speed

      this.x = this.canvasSettings.width
    }

    update() {
      this.x -= this.speed
      this.#draw()
      this.#updateFrames()
    }

    #draw() {
      this.canvasSettings.ctx.drawImage(
        this.image,
        this.frame * this.spriteWidth,
        0,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.width,
        this.height
      ) 
    }

    #updateFrames() {
      if(this.frameCounter % 3 === 0) this.frame++
      if(this.frame > this.maxFrames) this.frame = 0
      this.frameCounter++
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
    enemys = []
    obstacle = []

    nextObstacleSpawn = 200
    obstacleTimeCounter = 0

    nextEnemySpawn = 500
    enemyTimeCounter = 0

    constructor(canvasSettings) {
      this.canvasSettings = canvasSettings

      this.backgroundSky = new Background(970, 400, '../assets/background.png', 3, this.canvasSettings)
      this.backgroundClouds = new Background(970, 400, '../assets/clouds.png', 4, this.canvasSettings)
      this.playerHandler = new PlayerHandler(this.canvasSettings)
      this.player = new Player(200, 200, 250, 250, 4, 100, 230, this.canvasSettings, this.playerHandler)
    }

    update(deltaTime) {
      this.backgroundSky.update()
      this.backgroundClouds.update()
      this.#addEnemy(deltaTime)
      this.#addObstacle(deltaTime)
      this.enemys.forEach(e => e.update())
      this.obstacle.forEach(o => o.update())
      this.player.update()
    }

    #addEnemy(deltaTime) {
      this.enemyTimeCounter += deltaTime
      if(this.enemyTimeCounter >= this.nextEnemySpawn) {
        const enemy = new Enemy(410, 80, 410, 80, 4, '../assets/dragon.png', 8, this.canvasSettings)
        this.enemys.push(enemy)
        this.enemyTimeCounter = 0
        this.nextEnemySpawn = Math.random() * 1800 + 1200
      }
    }

    #addObstacle(deltaTime) {
      this.obstacleTimeCounter += deltaTime
      if(this.obstacleTimeCounter >= this.nextObstacleSpawn) {
        const surikens = new Obstacle(100, 100, 50, 50, '../assets/suriken.png', Math.random() * 2 + 6, 330, 2, this.canvasSettings) 
        this.obstacle.push(surikens)
        this.obstacleTimeCounter = 0
        this.nextObstacleSpawn = Math.random() * 1800 + 1200
      }
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