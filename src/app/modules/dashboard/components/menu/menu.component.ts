import {Component, EventEmitter, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  @Output() route: EventEmitter<any> = new EventEmitter<any>(true);

  constructor(
    private router: Router,
  ) {
  }

  navigate(paths: string[]) {
    this.router.navigate(paths).then(r => this.route.emit());
  }
}
