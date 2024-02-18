import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {TextFieldModule} from "@angular/cdk/text-field";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-reason.dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, TextFieldModule, MatButtonModule],
  templateUrl: './reason.dialog.component.html',
  styleUrls: ['./reason.dialog.component.scss']
})
export class ReasonDialogComponent implements OnInit {

  reasonControl = new FormControl('', Validators.required);

  constructor(
    private ref: MatDialogRef<ReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private comment: string
  ) {
  }

  ngOnInit(): void {
        if (this.comment) this.reasonControl.setValue(this.comment);
    }
  save() {
    this.ref.close(this.reasonControl.value);
  }
}
