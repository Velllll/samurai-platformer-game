export default class Background {
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