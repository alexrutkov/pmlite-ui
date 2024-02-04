import {Component, Inject} from '@angular/core';
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {FormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ConfirmMessage} from "@core/ConfirmMessage";

@Component({
  selector: 'app-confirm.dialog',
  standalone: true,
  imports: [
    CdkTextareaAutosize,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatHint
  ],
  templateUrl: './confirm.dialog.component.html',
  styleUrl: './confirm.dialog.component.scss'
})
export class ConfirmDialogComponent {

  constructor(
    public ref: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public message: ConfirmMessage
  ) {
  }

}
