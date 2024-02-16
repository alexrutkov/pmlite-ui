import {Component, Input} from '@angular/core';
import {AgreementDetails, AgreementTagSummary} from "@modules/agreements/model/AgreementSummary";

@Component({
  selector: 'app-agreement-tag-details',
  standalone: true,
  imports: [],
  templateUrl: './agreement-tag-details.component.html',
  styleUrl: './agreement-tag-details.component.scss'
})
export class AgreementTagDetailsComponent {
  tagDetails!: AgreementTagSummary;
  @Input() set details(value: AgreementDetails) {
    this.tagDetails = value as AgreementTagSummary;
  }
}
