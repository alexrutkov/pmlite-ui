import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <p-toast></p-toast>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
