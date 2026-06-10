import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="tabs"
export default class extends Controller {
  static targets = ["tab", "panel"]
  static values = { current: Number }
  static classes = ["activeTab", "inactiveTab", "panelHidden", "panelVisible"]

  change(event) {
    this.currentValue = event.params.index || Math.max(0, this.tabTargets.indexOf(event.target))
  }

  currentValueChanged(newValue, oldValue) {
    if (oldValue !== undefined) {
      this.tabTargets[oldValue].classList.remove(...this.activeTabClassesWithDefaults)
      this.panelTargets[oldValue].classList.add(...this.panelHiddenClassesWithDefaults)
    }
    this.tabTargets[newValue].classList.add(...this.activeTabClassesWithDefaults)
    this.panelTargets[newValue].classList.remove(...this.panelHiddenClassesWithDefaults)
  }

  previous() {
    this.currentValue = Math.max(0, this.currentValue - 1)
  }

  next() {
    this.currentValue = Math.min(this.currentValue + 1, this.tabTargets.length - 1)
  }

  get activeTabClassesWithDefaults() {
    return this.activeTabClasses.length > 0 ? this.activeTabClasses : ["active"]
  }

  get panelHiddenClassesWithDefaults() {
    return this.panelHiddenClasses.length > 0 ? this.panelHiddenClasses : ["hidden"]
  }
}
