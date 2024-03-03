import {Component, Input} from '@angular/core';
import {AgreementSummary, AgreementTaskSummary} from "@modules/agreements/model/AgreementSummary";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTabsModule} from "@angular/material/tabs";
import {UserDetailsComponent} from "@modules/users/components/user-details/user-details.component";
import {TaskDetailsComponent} from "@modules/tasks/components/task-details/task-details.component";

@Component({
  selector: 'app-agreement-task',
  standalone: true,
  templateUrl: './agreement-task.component.html',
  imports: [
    MatToolbarModule,
    MatTabsModule,
    UserDetailsComponent,
    TaskDetailsComponent
  ],
  styleUrls: ['./agreement-task.component.scss']
})
export class AgreementTaskComponent {

  details!: AgreementTaskSummary;
  private _agreementSummary!: AgreementSummary;
  @Input() set agreement(value: AgreementSummary) {
    this._agreementSummary = value;
    this.details = value.details as AgreementTaskSummary;
  }
  get agreement() {
    return this._agreementSummary;
  }

}
