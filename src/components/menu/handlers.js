export default class MenuHandler{
  constructor(canvasSettings) {
    this.canvasSettings = canvasSettings
  }

  showStartScreen() {
    this.canvasSettings.ctx.textAlign = "center"
    this.canvasSettings.ctx.fillStyle = "#fff"
    this.canvasSettings.ctx.font = '20px Libre Baskerville'
    this.canvasSettings.ctx.fillText("PRESS FOR PLAY", this.canvasSettings.width / 2, this.canvasSettings.height / 2)
    this.canvasSettings.ctx.fillText("Controls", this.canvasSettings.width / 2, this.canvasSettings.height / 2 + 80)
    this.canvasSettings.ctx.fillText("Jump - Arrow up", this.canvasSettings.width / 2, this.canvasSettings.height / 2 + 100)
    this.canvasSettings.ctx.fillText("Attack - Space", this.canvasSettings.width / 2, this.canvasSettings.height / 2 + 120)
    this.canvasSettings.ctx.fillStyle = "#000";
  }
}