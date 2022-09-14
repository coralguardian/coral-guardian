export default class AbstractForm {

  steps = []

  getSteps() {
    this.checkForm()
    return this.steps
  }

  checkForm() {
    if (!this.steps) {
      throw new Error("Form must have steps")
    }
  }
}