import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

const REQUIRED = '* Обязательно поле'
interface LengthError {
  requiredLength: number,
  actualLength: number
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }
  getError(control: AbstractControl | null) {
    const errors = control?.errors;
    if (errors) {
      return Object.keys(errors).map(e => {
        switch (e) {
          case 'required': return REQUIRED;
          case 'minlength': {
            const error = errors[e] as LengthError;
            return `Минимальное количество символов: ${error.requiredLength}`;
          }
          case 'maxlength': {
            const error = errors[e] as LengthError;
            return `Максимальное количество символов: ${error.requiredLength}`;
          }
          default: return ''
        }
      }).join(', ')
    }
    return '';
  }

  hasError(control: AbstractControl | null) {
    return control?.touched && control?.errors
  }
}
