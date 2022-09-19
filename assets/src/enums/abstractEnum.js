export default class AbstractEnum {

  static isValueValid(value) {
    return Object.values(this).includes(value);
  }

  static isPropertyValid(value) {
    return Object.keys(this).includes(value);
  }
}