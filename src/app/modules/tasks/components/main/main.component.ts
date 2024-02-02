import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private selectedIndexTab = 0;
  constructor(
    private route: ActivatedRoute
  ) {
  }

  isActive(index: number) {
    return this.selectedIndexTab == index;
  }

  indexFocus(index: number) {
    this.selectedIndexTab = index
  }
}
