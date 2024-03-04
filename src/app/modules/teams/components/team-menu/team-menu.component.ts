import {Component, Input, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {MatDivider} from "@angular/material/divider";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {concatMap, EMPTY, filter, map, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MessageToastService} from "@services/message.service";
import {AccountStore} from "@modules/account/account.store";
import {UserTaskRole} from "@modules/tasks/model/UserTaskRole";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-team-menu',
  standalone: true,
	imports: [
		AsyncPipe,
		MatDivider,
		MatIcon,
		MatIconButton,
		MatMenu,
		MatMenuItem,
		NgIf,
		RouterLink,
		MatMenuTrigger
	],
  templateUrl: './team-menu.component.html',
  styleUrl: './team-menu.component.scss'
})
export class TeamMenuComponent implements OnInit {
	@Input({required: true}) teamId!: number;

	enableEditTeam$: Observable<boolean> = EMPTY;
	enableTeamJoin$: Observable<boolean> = EMPTY;


	constructor(
		private http: HttpClient,
		private messageService: MessageToastService,
		public accountStore: AccountStore
	) {

	}

	private update() {

	}

	ngOnInit(): void {
		this.enableEditTeam$ = this.accountStore.hasTeamRole(this.teamId, UserTaskRole.OWNER);
		this.enableTeamJoin$ = this.accountStore.hasTeam(this.teamId).pipe(map(isEnable => !isEnable));
	}

	joinToTask() {
		this.messageService.confirm(
			'Вы уверены, что хотите присоединиться к выполнению данной задаче?',
			'Будет создана заявка, ожидайте согласования'
		).pipe(
			filter(isConfirmed => isConfirmed),
			concatMap(() => this.http.post(`/api/teams/${this.teamId}/join`, null))
		).subscribe(() => this.messageService.success('Заявка создана!'))
	}
}
