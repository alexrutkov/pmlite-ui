import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {NgxCaptchaModule} from "ngx-captcha";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {Route, RouterModule} from "@angular/router";
import {ConfirmComponent} from './components/confirm/confirm.component';
import {ExpiredComponent} from './components/expired/expired.component';
import {PasswordModule} from "primeng/password";
import {DividerModule} from "primeng/divider";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RegistrationComponent} from "@modules/registration/components/registration/registration.component";
import {RecoverComponent} from "@modules/registration/components/recover/recover.component";


const routes: Route[] = [
  {path: '', component: RegistrationComponent},
  {path: 'confirm/:token', component: ConfirmComponent},
  {path: 'recover', component: RecoverComponent},
  {path: 'expired', component: ExpiredComponent},
  {path: '**', redirectTo: 'expired'},
]

@NgModule({
  declarations: [
    RegistrationComponent,
    ConfirmComponent,
    ExpiredComponent,
    RecoverComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxCaptchaModule,
        CardModule,
        ButtonModule,
        InputTextModule,
        RouterModule.forChild(routes),
        PasswordModule,
        DividerModule,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel
    ]
})
export class RegistrationModule { }
