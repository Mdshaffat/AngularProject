//validation function rules
//export const functionName = () => {};
//export const functionName = (control: AbstractControl): {[key: string]: boolean} => {};


import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

  export const PasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
  
    return password && confirmPassword && password.value !== confirmPassword.value ? { identityRevealed: true } : null;
  };
