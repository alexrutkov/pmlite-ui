import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {HttpClient} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'app-task-menu',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatMiniFabButton,
    MatMenuModule,
    RouterLink,
    MatDivider
  ],
  templateUrl: './task-menu.component.html',
  styleUrl: './task-menu.component.scss'
})
export class TaskMenuComponent {

  @Input() taskId!: number;

  constructor(private http: HttpClient) {

  }

  private update() {

  }
}
