import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {CAPTCHA_KEY} from "@modules/registration/const";

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent implements OnInit {
  siteKey = CAPTCHA_KEY;

  recoverForm = this._fb.group({
    username: ['', Validators.required],
    recaptcha: ['', Validators.required]
  })
  constructor(
    private http: HttpClient,
    private _fb: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  recover() {
    this.http.post('recover-password', null, {params: new HttpParams()
        .set('username', this.recoverForm.get('username')!!.value as string)
        .set('recaptcha', this.recoverForm.get('recaptcha')!!.value as string)
    })
      .pipe(
      )
      .subscribe({
        next: () => {
          this.messageService.add({summary: 'Пароль выслан на учетные данные', severity: 'success'});
          this.router.navigate(['/login']);
        },
        error: () => this.messageService.add({summary: 'Пользователь не найден согласно заданным учетным данным', severity: 'error'})
      });
  }
}
