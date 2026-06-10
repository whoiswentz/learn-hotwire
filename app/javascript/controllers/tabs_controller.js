import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static targets = ["tab", "panel"]
  static values = { current: Number }

  change(event) {
    this.currentValue = event.params.index || Math.max(0, this.tabTargets.indexOf(event.target))
  }

  currentValueChanged(newValue, oldValue) {
    if (oldValue !== undefined) {
      this.tabTargets[oldValue].classList.remove("active-tab")
      this.panelTargets[oldValue].classList.add("hidden")
    }
    this.tabTargets[newValue].classList.add("active-tab")
    this.panelTargets[newValue].classList.remove("hidden")
  }

  previous() {
    this.currentValue = Math.max(0, this.currentValue - 1)
  }

  next() {
    this.currentValue = Math.min(this.currentValue + 1, this.tabTargets.length - 1)
  }
}
