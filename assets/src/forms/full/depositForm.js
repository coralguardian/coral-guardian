import AbstractForm from "../abstractForm";
import Step from "@/forms/Step";

export default class DepositForm extends AbstractForm {
  steps = [
    new Step(
      "default.stepper.header.adopterType",
      null,
      "CheckAdoption",
      () => true,
      true,
      false,
      true,
      false
    ),
  ]
}
