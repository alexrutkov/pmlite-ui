import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TabRouterComponent} from "@core/TabRouterComponent";

@Component({
  selector: 'app-tasks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends TabRouterComponent {
  constructor(
    router: Router
  ) {
    super(router);
  }
}
