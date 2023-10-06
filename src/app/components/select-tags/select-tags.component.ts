import {Component, ElementRef, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {PaginatorModule} from "primeng/paginator";
import {filter, Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Tag} from "@modules/account/model/Profile";


@Component({
  selector: 'app-select-tags',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatOptionModule, PaginatorModule, ReactiveFormsModule],
  templateUrl: './select-tags.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectTagsComponent
    }
  ],
  styleUrls: ['./select-tags.component.scss']
})
export class SelectTagsComponent implements ControlValueAccessor {
  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagControl = new FormControl('');
  filteredTags: Observable<Tag[]>;
  tags: Tag[] = [];
  allTags: Tag[] = [
    {name: 'программист', id: 'asdf'}
  ];
  constructor() {
    this.filteredTags = this.tagControl.valueChanges.pipe(
      filter(s => typeof s === 'string'),
      startWith(null),
      map((searchTag: string | null) => (searchTag ? this._filter(searchTag) : this.allTags.slice())),
    );
  }

  onChange = (tags: Tag[]) => {};

  onTouched = () => {};

  writeValue(tags: Tag[]): void {
    if (tags) this.tags = tags;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value, id: ''});
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagControl.setValue(null);
  }

  remove(tag: Tag): void {
    const index = this.tags.findIndex(t => t.name === tag.name);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.value as Tag);
    this.fruitInput.nativeElement.value = '';
    this.tagControl.setValue(null);
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }
  }

  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(tag => tag.name.toLowerCase().includes(filterValue));
  }

}
