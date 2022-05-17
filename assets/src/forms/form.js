export default class AbstractForm {

  form = []

  getForm() {
    this.checkForm()
    return this.form
  }

  checkForm() {
    if (!this.form.tabs) {
      throw new Error("Form must have tabs")
    }

    if (!this.form.steps) {
      throw new Error("Form must have steps")
    }

    if (this.form.tabs.length !== this.form.steps.length) {
      throw new Error("Form must have equal tabs and steps")
    }
  }
}