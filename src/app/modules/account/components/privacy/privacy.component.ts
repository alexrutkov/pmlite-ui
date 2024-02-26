import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {AppValidators} from "@validators/RulesPasswordValidator";
import {HttpClient} from "@angular/common/http";
import {concatMap, filter, Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss']
})
export class PrivacyComponent {

  passwordForm: FormGroup = this._fb.group({
    password: ['', [Validators.required, AppValidators.passwordRuleValidator]],
    confirmPassword: ['', [Validators.required, this.compareValidator.bind(this)]],
    currentPassword: ['', Validators.required, this.validateCurrentPassword.bind(this)]
  })

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageToastService
  ) {
  }

  compareValidator(control: FormControl) {
    const old = this.passwordForm?.get('password')?.value;
    const current = control.value;
    if (old === current) return null;
    return {compare: true};
  }

  validateCurrentPassword(control: FormControl): Observable<ValidationErrors | null> {
    return this.http.post('/api/account/validate/password', {password: control.value})
      .pipe(
        map(() => null),
        catchError(e => of({validatePassword: true}))
      );
  }

  savePassword() {
    const password = this.passwordForm?.get('password')?.value;
    const oldPassword = this.passwordForm?.get('currentPassword')?.value;
    this.messageService.confirm('Вы уверены, что хотите изменить пароль?')
      .pipe(
        filter(isConfirmed => isConfirmed),
        concatMap(() => this.http.post('/api/account/password', {password, oldPassword}))
      ).subscribe(() => this.messageService.success('Пароль сохранен!'));
  }
}
