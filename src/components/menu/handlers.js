export default class MenuHandler{
  constructor(canvasSettings) {
    this.canvasSettings = canvasSettings
  }

  showStartScreen() {
    this.canvasSettings.ctx.textAlign = "center"
    this.canvasSettings.ctx.fillStyle = "#fff"
    this.canvasSettings.ctx.font = '20px Libre Baskerville'
    this.canvasSettings.ctx.fillText("PRESS FOR PLAY", this.canvasSettings.width / 2, this.canvasSettings.height / 2)
    this.canvasSettings.ctx.fillStyle = "#000";
  }

  toggleFullScreen() {
    if(!document.fullscreenElement) {
      this.canvasSettings.canvas.requestFullscreen().catch(err => console.log(err))
    } else {
      document.exitFullscreen()
    }
  }
}