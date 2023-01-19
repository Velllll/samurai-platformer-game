import run from '../../assets/Run.png'
import attack2 from '../../assets/Attack2.png'
import jump from '../../assets/Jump.png'

export default class Player {
  frameX = 0
  frameCounter = 0

  velocity = 0
  weight = 1

  attack = false

  health = 3

  gotDamageInAir = false

  movement = {
    run: {
      src: run,
      image: new Image(),
      maxFrames: 7
    },
    attack: {
      src: attack2,
      image: new Image(),
      maxFrames: 5
    },
    jump: {
      src: jump,
      image: new Image(),
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

    this.#initMovementImages()
  }

  #initMovementImages() {
    for(let key in this.movement) {
      this.movement[key].image.src = this.movement[key].src
    }
  }

  update() {
    this.#handleKeys()
    this.#draw()
    this.#updateFrames()
  }

  OnGround() {
    return this.y >= 230
  } 

  #draw() {
    //show player hitbox
    // this.canvasSettings.ctx.strokeRect(this.x + 100, this.y + 100, this.playerWidth - 200, this.playerHeight - 200)
    
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
      if(k === 'ArrowUp' && this.OnGround()) {
        this.velocity = 23
      } 
      if(k === 'Space' && !this.OnGround()) {
        this.attack = true
        this.image = this.movement.attack.image
        this.maxFrames = this.movement.attack.maxFrames
      }
    }) 

    this.#handelJump()
  }

  #handelJump() {
    if(!this.OnGround()) {
      this.velocity -= this.weight
    }
    if(!this.OnGround() && !this.attack) {
      this.image = this.movement.jump.image
      this.maxFrames = this.movement.jump.maxFrames
    } 
    if(!this.OnGround() && this.attack) {
      this.image = this.movement.attack.image
      this.maxFrames = this.movement.attack.maxFrames
    } 
    if(this.OnGround()) {
      this.y = 230
      this.attack = false
      this.image = this.movement.run.image
      this.maxFrames = this.movement.run.maxFrames
    }
  }

  getDamage() {
    if(!this.gotDamageInAir) {
      this.health--
      this.gotDamageInAir = true
    }      
  }

  #updateFrames() {
    if(this.frameCounter % this.playerSpeed === 0) this.frameX++
    if(this.frameX > this.maxFrames) this.frameX = 0
    this.frameCounter++
  }
}