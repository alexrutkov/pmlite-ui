import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {INVISIBLE_CAPTCHA_KEY} from "@modules/registration/const";
import {InvisibleReCaptchaComponent} from "ngx-captcha";
import {MessageToastService} from "@services/message.service";
import {catchError, map} from "rxjs/operators";


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit, AfterViewInit {
  siteKey = INVISIBLE_CAPTCHA_KEY;
  isLowerValid: boolean = false;
  isUpperValid: boolean = false;
  isDigitValid: boolean = false;
  isSpecialValid: boolean = false;
  isLengthValid: boolean = false;
  token: string = '';
  isTokenValid: boolean = false;

  passwordForm: FormGroup = this._fb.group({
    password: ['', [Validators.required, this.rulesValidator.bind(this)]],
    confirmPassword: ['', [Validators.required, this.compareValidator.bind(this)]],
    recaptcha: ['', Validators.required]
  })

  @ViewChild('captchaElem') captchaElem: InvisibleReCaptchaComponent | undefined;

  constructor(
    private _fb: FormBuilder,
    private http: HttpClient,
    private messageService: MessageToastService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.passwordForm.get('recaptcha')?.valueChanges
      .subscribe(() => {
        if (!this.isTokenValid) { this.validateToken() }
      })
  }

  ngOnInit(): void {
    this.route.params.pipe(map(p => p['token']))
      .subscribe(t => this.token = t);
  }

  ngAfterViewInit(): void {
  }

  rulesValidator(control: FormControl) {
    const passwd = control.value;
    this.isLowerValid = /[a-z]/.test(passwd)
    this.isUpperValid = /[A-Z]/.test(passwd)
    this.isDigitValid = /[0-9]/.test(passwd)
    this.isSpecialValid = /\W/.test(passwd)
    this.isLengthValid = passwd.length > 7
    if (this.isLengthValid
      && this.isUpperValid
      && this.isLowerValid
      && this.isDigitValid
      && this.isSpecialValid
    ) return null
    return {rules: true};
  }

  compareValidator(control: FormControl) {
    const old = this.passwordForm?.get('password')?.value;
    const current = control.value;
    if (old === current) return null;
    return {compare: true};
  }

  savePassword() {
    this.http.post('/api/authorization/saveRecoveryPassword', {
      token: this.token,
      password: this.passwordForm.get('password')!.value,
      recaptcha: this.passwordForm.get('recaptcha')!.value
    }).subscribe({
      next: () => {
        this.messageService.success('Пароль сохранен!');
        this.router.navigate(['/']);
      },
      error: (e: HttpErrorResponse) => {
        this.messageService.error(e.error.message)
        // this.router.navigate(['/registration', 'expired']);
      }
    })
  }

  onReadyCaptcha() {
    this.captchaElem?.execute();
  }


  private validateToken() {
    this.http.post('/api/authorization/validateUserToken', {
      token: this.token,
      recaptcha: this.passwordForm.get('recaptcha')!.value
    })
      .pipe(
        map(() => this.isTokenValid = true),
        catchError((e: HttpErrorResponse) => {
          this.messageService.error(e.error.message);
          return this.router.navigate(['/registration', 'expired'])
        }),
      ).subscribe(() => this.captchaElem?.reloadCaptcha())
  }
}
