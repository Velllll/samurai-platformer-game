export default class CanvasSettings {
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