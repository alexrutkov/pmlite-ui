import {Component} from '@angular/core';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {SelectTagsComponent} from "@modules/tags/components/select-tags/select-tags.component";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {Tag} from "@modules/tags/model/Tag";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-account-tag',
  standalone: true,
  imports: [
    MatDialogModule,
    SelectTagsComponent,
    MatButton,
    ReactiveFormsModule
  ],
  templateUrl: './add-account-tag.component.html',
  styleUrl: './add-account-tag.component.scss'
})
export class AddAccountTagComponent {

  tagsControl: FormControl = new FormControl<Tag[]>([]);

  constructor(
    public ref: MatDialogRef<AddAccountTagComponent>
  ) {

  }


  addAccountTags() {
    this.ref.close(this.tagsControl.value);
  }
}
