import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from "@angular/material/chips";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatChipsModule, RouterLink],
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent {

}
