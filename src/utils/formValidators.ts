import { FormGroup, FormControl, ValidatorFn } from "@angular/forms";

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function MatchToString(matchTo: string) {
  return (formGroup: FormGroup) => {
    if (formGroup.value == matchTo) return null;
    return { match: true };
  };
}

export function checkDateFromNow() {
  return (control: FormControl) => {
    if (new Date(control.value).getTime() < new Date().getTime())
      return { dateBeforeNow: true };
    return null;
  };
}

export function matchToAndFromDates(
  controlFromName: string,
  controlToName: string
) {
  return (formGroup: FormGroup) => {
    const dateTo = new Date(
      formGroup.controls[controlFromName].value
    ).getTime();
    const dateFrom = new Date(
      formGroup.controls[controlToName].value
    ).getTime();

    if (dateTo <= dateFrom) return { dateToBeforeDatefrom: true };
    return null;
  };
}
// export function checkToDate() {
//   return (formGroup: FormGroup, control: FormControl) => {
//     let startDate = new Date(formGroup.get("startDate").value).getTime();
//     let endDate = new Date(control.value).getTime();
//     console.log(endDate);

//     if (endDate < startDate) return { endDateBeforeStart: true };
//     return null;
//   };
// }

export const dateRangeValidator: ValidatorFn = (fg: FormGroup) => {
  let start = fg.get("startDate").value;
  let end = fg.get("endDate").value;
  if (!end || !end) return { range: true };
  start = new Date(start).getTime();
  end = new Date(end).getTime();
  return start !== null && end !== null && start < end ? null : { range: true };
};
