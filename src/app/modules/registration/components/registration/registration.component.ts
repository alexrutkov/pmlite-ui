import {Component} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {MessageToastService} from "@services/message.service";
import {finalize, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {CAPTCHA_KEY} from "@modules/registration/const";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  siteKey = CAPTCHA_KEY;
  registrationForm = this._fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email], this.emailValidator()],
    recaptcha: ['', Validators.required]
  })

  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private messageService: MessageToastService,
    private router: Router
  ) {
  }

  hasError(name: string, validatorName: string = 'required') {
    const control = this.registrationForm.get(name)
    return control && control.dirty && control.hasError(validatorName);
  }

  emailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.post<{ isValid: boolean }>('/api/registration/validateEmail', {email: control.value})
        .pipe(
          map(res => res.isValid ? null : {emailExists: true}),
          catchError((err: HttpErrorResponse) => {
            this.messageService.error(err.error.message);
            return of({emailExists: true});
          }),
          finalize(() => control.markAsDirty())
        );
    };
  }

  attemptRegistration() {
    console.log(this.registrationForm.get('recaptcha')?.value)

    if (this.registrationForm.valid) {
      this.registration();
    } else {
      Object.keys(this.registrationForm.controls)
        .forEach(name => { this.registrationForm.get(name)?.markAsDirty();});
    }
  }

  private registration() {
    this.http.post('/api/registration', {
      name: this.registrationForm.get('name')?.value,
      email: this.registrationForm.get('email')?.value,
      recaptcha: this.registrationForm.get('recaptcha')?.value
    })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: (err: HttpErrorResponse) => this.messageService.error('Произошла ошибка при регистрации: ' + err.error.message)
      });
  }
}
