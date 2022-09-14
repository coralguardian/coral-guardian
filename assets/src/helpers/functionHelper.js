import AbstractForm from "@/forms/form";

function customizerMergeObjectWithArrays(objValue, srcValue) {
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

export default customizerMergeObjectWithArrays