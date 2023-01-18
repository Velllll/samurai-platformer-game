export default class PlayerHandler {
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