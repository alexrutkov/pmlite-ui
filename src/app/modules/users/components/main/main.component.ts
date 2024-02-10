import {Component} from '@angular/core';

@Component({
  selector: 'app-users-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private selectedIndexTab = 0;

  isActive(index: number) {
    return this.selectedIndexTab == index;
  }

  indexFocus(index: number) {
    this.selectedIndexTab = index
  }
}
