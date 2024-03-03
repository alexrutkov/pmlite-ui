import {Component} from '@angular/core';
import {TabRouterComponent} from "@core/TabRouterComponent";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
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
