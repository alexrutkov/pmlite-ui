import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLinkWithHref} from '@angular/router';
import {finalize} from 'rxjs';
import {AuthenticationService} from "@services/authentication.service";
import {CardModule} from "primeng/card";
import {ProgressBarModule} from "primeng/progressbar";
import {ButtonModule} from "primeng/button";
import {CommonModule, NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    CardModule,
    ProgressBarModule,
    ButtonModule,
    NgIf,
    ReactiveFormsModule,
    InputTextModule,
    RouterLinkWithHref
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentialsGroup: FormGroup;
  showSpinner = false;

  constructor(
    private router: Router,
    _fb: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.credentialsGroup = _fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    // this.authService.isAuthorized().subscribe();
  }

  public login() {
    this.showSpinner = true;
    this.authService
      .login(this.credentialsGroup.getRawValue())
      .pipe(finalize(() => this.showSpinner = false))
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }


}
