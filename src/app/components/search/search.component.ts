import {Component} from '@angular/core';
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatPrefix, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {NgClass, NgIf} from "@angular/common";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatBadge} from "@angular/material/badge";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Component({
	selector: 'app-search',
	standalone: true,
	imports: [
		MatFabButton,
		MatFormField,
		MatIcon,
		MatInput,
		NgClass,
		NgIf,
		ReactiveFormsModule,
		MatSuffix,
		MatIconButton,
		MatPrefix,
		MatBadge
	],
	templateUrl: './search.component.html',
	styleUrl: './search.component.scss',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: SearchComponent
		}
	],
})
export class SearchComponent implements ControlValueAccessor {

	isActive = false;
	searchControl = new FormControl('', Validators.required)

	constructor() {
		this.searchControl.valueChanges
			.pipe(
				debounceTime(300),
				distinctUntilChanged()
			)
			.subscribe(v => this.onChange(v))
	}
	onChange = (search: string | null) => {};

	onTouched = () => {};

	writeValue(search: string | null): void {
		this.searchControl.patchValue(search);
	}

	registerOnChange(onChange: any): void {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		isDisabled ? this.searchControl.disable() : this.searchControl.enable()
	}


}
