import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "@services/authentication.service";

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <p-toast></p-toast>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ['.container {max-width: 599px; margin: auto;}']
})
export class AppComponent implements  OnInit{
  constructor(private service: AuthenticationService) {
  }

  ngOnInit(): void {
    this.service.isAuthorized().subscribe()
  }
}
