import { Component, OnInit } from '@angular/core';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import {AuthenticationService} from "@services/authentication.service";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
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
    this.authService.isAuthorized().subscribe();
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
