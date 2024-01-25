import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {CAPTCHA_KEY} from "@modules/registration/const";


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit{

  isLowerValid: boolean = false;
  isUpperValid: boolean = false;
  isDigitValid: boolean = false;
  isLengthValid: boolean = false;
  token: string = '';

  passwordForm: FormGroup = this._fb.group({
    password: ['', [Validators.required, this.rulesValidator.bind(this)]],
    confirmPassword: ['', [Validators.required, this.compareValidator.bind(this)]]
  })

  constructor(
    private _fb: FormBuilder,
    private _http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'];
    if (this.token) {
      this._http.post('/api/registration/token/check', null,
        {params: {token: this.token}}
        )
        .subscribe({
          next: () => {},
          error: () => this.router.navigate(['/registration', 'expired'])
        })
    }
  }

  rulesValidator(control: FormControl) {
    const passwd = control.value;
    this.isLowerValid = /[a-z]/.test(passwd)
    this.isUpperValid = /[A-Z]/.test(passwd)
    this.isDigitValid = /[0-9]/.test(passwd)
    this.isLengthValid = passwd.length > 7
    if (this.isLengthValid
        && this.isUpperValid
        && this.isLowerValid
        && this.isDigitValid) return null
    return {rules: true};
  }

  compareValidator(control: FormControl) {
    const old = this.passwordForm?.get('password')?.value;
    const current = control.value;
    if (old === current) return null;
    return {compare: true};
  }

  savePassword() {
    this._http.post('/api/registration/save-password', {
      token: this.token,
      password: this.passwordForm.get('password')!.value
    }).subscribe({
      next: () => {
        this.messageService.add({severity: 'success', summary: 'Пароль сохранен!'});
        this.router.navigate(['/login']);
      },
      error: () => this.router.navigate(['/registration', 'expired'])
    })
  }


  protected readonly CAPTCHA_KEY = CAPTCHA_KEY;
}
