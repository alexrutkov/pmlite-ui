import {Component} from '@angular/core';
import {MatFabButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
	imports: [
		MatFabButton,
		MatFormField,
		MatIcon,
		MatInput,
		NgClass,
		NgIf
	],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

	isActive = false;
}
