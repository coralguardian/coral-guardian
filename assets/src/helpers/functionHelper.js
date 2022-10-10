import AbstractForm from "@/forms/abstractForm";

export function customizerMergeObjectWithArrays(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export function checkStepsToDisplay(formToCheck, state) {
  if (!(formToCheck instanceof AbstractForm)) {
    throw "Utiliser un AbstractForm !!!"
  }
  let steps = formToCheck.getSteps()

  return steps.filter(step => typeof step.display !== "function" || step.display(state))
}