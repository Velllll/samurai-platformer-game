export default class Obstacle {
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