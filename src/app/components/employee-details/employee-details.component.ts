import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatChipsModule],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {

}
