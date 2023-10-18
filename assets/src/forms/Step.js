export default class Step {
  constructor(
    title = "",
    number = null,
    component = "",
    display = () => true,
    validate = false,
    ignorable = false,
    customValidation = false,
    displayBreadcrumb = true,
    api = null,
    back = true,
    isLast = false,
    continueButtonLabel = 'continue'
  ) {
    this.title = title;
    this.number = number;
    this.component = component;
    this.display = display;
    this.validate = validate;
    this.ignorable = ignorable;
    this.customValidation = customValidation;
    this.displayBreadcrumb = displayBreadcrumb;
    this.api = api;
    this.back = back;
    this.isLast = isLast;
    this.continueButtonLabel = continueButtonLabel
  }

  // méthode exécutée à chaque fois que l'on essaie d'afficher l'étape et si elle retourne false alors on saute l'étape
  evaluate() {
    return true
  }

  // méthode exécutée à chaque fois que l'on décharge l'étape en faisant précédent
  destroy() {
    return
  }
}
