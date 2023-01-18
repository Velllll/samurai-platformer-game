export default class Enemy {
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