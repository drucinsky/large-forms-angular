import { AbstractControl, ValidationErrors } from '@angular/forms';
const weights9: number[] = [8, 9, 2, 3, 4, 5, 6, 7];
const weights14: number[] = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

export const regonValidator: (control: AbstractControl) => ValidationErrors | null = (control: AbstractControl): ValidationErrors | null => {
  const reg = /^[0-9]{9,14}$/u;
  if (!reg.test(control.value)) {
    return { regon: control.value };
  }

  if (control.value.length === 9) {
    return !checksum(control.value, weights9) ? { regon: control.value } : null;
  }

  const isRegonValid: boolean = checksum(control.value.slice(0, 9), weights9) && checksum(control.value, weights14);
  return !isRegonValid ? { regon: control.value } : null;
};

const checksum: (number: string, weights: number[]) => boolean = (number: string, weights: number[]): boolean => {
  const max = number.length - 1;
  let sum = 0;

  for (let i = 0; i < max; ++i) {
    const n = parseInt(number.charAt(i), 10);
    sum += n * (weights[i] as number);
  }

  const control = sum % 11;
  const resultSum = control === 10 ? 0 : control;
  const lastDigit = parseInt(number.slice(-1), 10);
  console.log(resultSum === lastDigit);
  return resultSum === lastDigit;
}
