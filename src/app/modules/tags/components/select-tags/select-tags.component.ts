import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatChipInputEvent, MatChipsModule} from "@angular/material/chips";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatOptionModule} from "@angular/material/core";
import {PaginatorModule} from "primeng/paginator";
import {concatMap, debounceTime, filter, Observable} from "rxjs";
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators} from "@angular/forms";
import {ENTER} from "@angular/cdk/keycodes";
import {ErrorService} from "@services/error.service";
import {MatInput} from "@angular/material/input";
import {MessageToastService} from "@services/message.service";
import {HttpClient} from "@angular/common/http";

import {Tag} from "@modules/tags/model/Tag";


@Component({
  selector: 'app-select-tags',
  standalone: true,
  imports: [CommonModule, MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatOptionModule, PaginatorModule, ReactiveFormsModule, MatInput],
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
  @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;

  @Output() removed: EventEmitter<number> = new EventEmitter<number>();

  separatorKeysCodes: number[] = [ENTER];
  tagControl = new FormControl<string>(
    '',
    [
      Validators.maxLength(25),
      Validators.required,
      Validators.minLength(2)
    ]
  );
  filteredTags$: Observable<Tag[]>;
  tags: Tag[] = [];
  constructor(
    private errorService: ErrorService,
    private messageService: MessageToastService,
    private http: HttpClient
  ) {
    this.filteredTags$ = this.tagControl.valueChanges.pipe(
      debounceTime(300),
      filter(s => !!s && s.length > 1),
      concatMap(s => this.http.post<Tag[]>('/api/tags/search', {tag: s}))
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
    if (this.tagControl.valid) {
      this.messageService.confirm(
        `Вы уверены, что хотите добавить новый тег '${value}'?`,
        'Проверьте на грамматические ошибки.'
      )
        .pipe(
          filter(isConfirmed => isConfirmed),
          concatMap(() => this.http.post<Tag>('/api/tags', {tag: value}))
        )
        .subscribe(tag => {
          this.messageService.info('Тег добавлен.')
          this.tags.push(tag);
        })
    } else {
      this.messageService.error(this.errorService.getError(this.tagControl))
    }
    event.chipInput!.clear();

    this.tagControl.setValue('');
  }

  remove(tag: Tag): void {

    this.messageService.confirm(
      `Вы уверены, что хотите убрать тег '${tag.displayTag}'?`
    )
      .pipe(
        filter(isConfirmed => isConfirmed)
      )
      .subscribe(() => {
        this.removed.emit(tag.tagId);
        const index = this.tags.findIndex(t => t.tagId === tag.tagId);
        this.tags.splice(index, 1);
    })

  }

  selected(event: MatAutocompleteSelectedEvent): void {
		const tag = event.option.value as Tag;
		const tagIndex = this.tags.findIndex(t => t.tagId == tag.tagId);
		if (tagIndex == -1) {
			this.tags.push(tag);
		}
    this.tagInput.nativeElement.value = '';
    this.tagControl.setValue('');
  }

}
