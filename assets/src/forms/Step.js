export default class Step {
  constructor(
    title = "",
    number = null,
    component = "",
    display = true,
    validate = false,
    ignorable = false,
    customValidation = false,
    displayBreadcrumb = true,
    api = null,
    back = true,
    isLast = false,
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
  }
}
