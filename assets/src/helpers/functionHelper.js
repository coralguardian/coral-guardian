import AbstractForm from "@/forms/abstractForm";
import md5 from 'blueimp-md5'

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

export function getAuthorizationHeader() {
  const date = new Date()
  const token = md5('Bloc4B0tz' + Math.trunc(date.getTime() / 1000 / 60))
  return { headers: {'Authorization': 'Bearer ' + token }}
}
