import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {CAPTCHA_KEY} from "@modules/registration/const";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent implements OnInit {
  siteKey = CAPTCHA_KEY;

  recoverForm = this._fb.group({
    email: ['', Validators.required],
    recaptcha: ['', Validators.required]
  })
  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private messageService: MessageToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  recover() {
    this.http.post('/api/authorization/recoveryPassword', this.recoverForm.getRawValue())
      .subscribe({
        next: () => {
          this.messageService.success('Письмо для восстановления выслано на почтовый ящик!');
          this.router.navigate(['/login']);
        },
        error: () => this.messageService
          .error('Пользователь не найден согласно заданным учетным данным')
      });
  }
}
