import { AbstractControl, ValidationErrors } from "@angular/forms";

export const ValidatorChar = (control: AbstractControl): ValidationErrors | null => {
  const isValidChar = (char: string) => {
    const regex = new RegExp(/^[A-Za-z0-9]+$/);
    return regex.test(char);
  };
  if (control.value && !isValidChar(control.value)) {
    return { validChar: true };
  }
  return null;
};
