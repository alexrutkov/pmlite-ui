import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";
import {MatButton} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {EMPTY, Observable, take, zip} from "rxjs";
import {TeamSummary} from "@modules/teams/model/TeamSummary";
import {AccountStore} from "@modules/account/account.store";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {AsyncPipe} from "@angular/common";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-select-team.dialog',
  standalone: true,
	imports: [
		MatDialogModule,
		MatButton,
		MatRadioModule,
		ReactiveFormsModule,
		AsyncPipe
	],
  templateUrl: './select-team.dialog.component.html',
  styleUrl: './select-team.dialog.component.scss'
})
export class SelectTeamDialogComponent implements OnInit {

	teamControl = new FormControl(null, Validators.required);
	teams$: Observable<TeamSummary[]> = EMPTY;
	constructor(
		@Inject(MAT_DIALOG_DATA) private taskId: number,
		private accountStore: AccountStore,
		private http: HttpClient,
		private messageService: MessageToastService,
		private _dialogRef: DialogRef<SelectTeamDialogComponent>
	) {
	}

	ngOnInit() {
		this.teams$ = zip(
			this.http.get<TeamSummary[]>('/api/teams/myOwnerTeams'),
			this.accountStore.state$.pipe(take(1))
		).pipe(
			map(([teams, state]) => {
				const taskTeams = state.details.taskTeams
					.filter(t => this.taskId == t.taskId)
					.map(t => t.teamId);
				return teams.filter(t => !taskTeams.includes(t.id))
			})
		);
	}

	joinTeam() {
		this.http.post(`/api/teams/${this.teamControl.value}/joinToTask/${this.taskId}`, null)
			.subscribe(() => {
				this.messageService.success('Заявка отправлена!');
				this._dialogRef.close();
			})
	}
}
