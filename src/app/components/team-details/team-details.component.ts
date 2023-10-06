import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-team-details',
  standalone: true,
    imports: [CommonModule, MatChipsModule, NgOptimizedImage],
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent {

}
