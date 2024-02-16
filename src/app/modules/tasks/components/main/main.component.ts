import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TabRouterComponent} from "@core/TabRouterComponent";

@Component({
  selector: 'app-tasks-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends TabRouterComponent {
  constructor(
    private route: ActivatedRoute,
    router: Router
  ) {
    super(router);
  }
}
