import {AbstractControl, ValidationErrors} from "@angular/forms";


export class AppValidators {
  static passwordRuleValidator(control: AbstractControl): ValidationErrors | null {
    const passwd = control.value as string;
    const isLowerValid = /[a-z]/.test(passwd)
    const isUpperValid = /[A-Z]/.test(passwd)
    const isDigitValid = /[0-9]/.test(passwd)
    const isSpecialValid = /\W/.test(passwd)
    const isLengthValid = passwd.length > 7
    if (isLengthValid
      && isUpperValid
      && isLowerValid
      && isDigitValid
      && isSpecialValid
    ) return null
    const errors: {[key: string]: boolean} = {};
    if (!isLowerValid) errors['isLowerValid'] = true
    if (!isUpperValid) errors['isUpperValid'] = true
    if (!isDigitValid) errors['isDigitValid'] = true
    if (!isSpecialValid) errors['isSpecialValid'] = true
    if (!isLengthValid) errors['isLengthValid'] = true
    return errors;
  }
}
