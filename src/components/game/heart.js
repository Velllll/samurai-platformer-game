export default class Heart {
  constructor(width, height, imageSrc, x, y, canvasSettings) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.canvasSettings = canvasSettings
    this.image = new Image()
    this.image.src = imageSrc
  }

  draw(health) {
    console.log()
    for (let i = 0; i < health; i++) {
      this.canvasSettings.ctx.drawImage(
        this.image,
        0,
        0,
        this.width,
        this.height,
        this.x + this.width * i,
        this.y,
        this.width,
        this.height
      )
    }
  }
}