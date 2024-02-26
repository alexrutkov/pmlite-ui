import {Component, Input} from '@angular/core';
import {AbstractControl} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-password-rules',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './password-rules.component.html',
  styleUrl: './password-rules.component.scss'
})
export class PasswordRulesComponent {

  @Input({required: true}) passwordControl!: AbstractControl;
}
