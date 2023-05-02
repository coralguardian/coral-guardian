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
  // method qui valide le passage au formulaire suivant et qui le retourne
  nextForm() {
    throw "Implement 'nextForm' method !"
  }
  // method exécutée lors du déchargement d'un formulaire
  /**
   * @property state - le state du store
   * @returns {Promise<unknown>}
   */
  unload() {
    return new Promise(resolve => resolve())
  }

  // method exécutée lors du chargement d'un formulaire
  /**
   * @property state - le state du store
   */
  onload() {
  }

  // method exécutée avant le chargement d'un formulaire
  /**
   * @property context - le store
   * @returns {Promise<unknown>}
   */
  beforeLoad() {
    return new Promise(resolve => resolve())
  }
}
