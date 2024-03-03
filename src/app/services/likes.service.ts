import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {EMPTY, tap} from "rxjs";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {MessageToastService} from "@services/message.service";
import {TeamSummary} from "@modules/teams/model/TeamSummary";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

	private loadingTasks: number[] = [];
	private loadingUsers: number[] = [];
	private loadingTeams: number[] = [];
  constructor(
		private http: HttpClient,
		private messageService: MessageToastService
	) { }

	likeTask(task: TaskSummary) {
		if (!this.loadingTasks.includes(task.id)) {
			this.loadingTasks.push(task.id);
			const request = task.isLiked
				? this.http.delete(`/api/likes/${task.id}`, {params: {type: 'TASK'}})
					.pipe(tap(() => task.likeAmount--))
				: this.http.post('/api/likes', {entityId: task.id, type: 'TASK'})
					.pipe(tap(() => task.likeAmount++));
			return request.pipe(
				tap(() =>  this.loadingTasks.splice(this.loadingTasks.indexOf(task.id), 1))
			);
		} else return EMPTY;
	}

	starTask(task: TaskSummary) {
		if (!this.loadingTasks.includes(task.id)) {
			this.loadingTasks.push(task.id);
			const request = task.isStared
				? this.http.delete(`/api/stars/${task.id}`, {params: {type: 'TASK'}})
					.pipe(tap(() => task.starAmount--))
				: this.http.post('/api/stars', {entityId: task.id, type: 'TASK'})
					.pipe(
						tap(() => task.starAmount++),
						tap(() => this.messageService.success('Добавлено в избранное!'))
					);
			return request.pipe(
				tap(() =>  this.loadingTasks.splice(this.loadingTasks.indexOf(task.id), 1))
			);
		} else return EMPTY;
	}

	likeUser(user: UserShortDetails) {
		if (!this.loadingUsers.includes(user.id)) {
			this.loadingUsers.push(user.id);
			const request = user.isLiked
				? this.http.delete(`/api/likes/${user.id}`, {params: {type: 'USER'}})
					.pipe(tap(() => user.likeAmount--))
				: this.http.post('/api/likes', {entityId: user.id, type: 'USER'})
					.pipe(tap(() => user.likeAmount++));
			return request.pipe(
				tap(() =>  this.loadingUsers.splice(this.loadingUsers.indexOf(user.id), 1))
			);
		} else return EMPTY;
	}

	starUser(user: UserShortDetails) {
		if (!this.loadingUsers.includes(user.id)) {
			this.loadingUsers.push(user.id);
			const request = user.isStared
				? this.http.delete(`/api/stars/${user.id}`, {params: {type: 'USER'}})
					.pipe(tap(() => user.starAmount--))
				: this.http.post('/api/stars', {entityId: user.id, type: 'USER'})
					.pipe(
						tap(() => user.starAmount++),
						tap(() => this.messageService.success('Добавлено в избранное!'))
					);
			return request.pipe(
				tap(() =>  this.loadingUsers.splice(this.loadingUsers.indexOf(user.id), 1))
			);
		} else return EMPTY;
	}

	likeTeam(team: TeamSummary) {
		if (!this.loadingTeams.includes(team.id)) {
			this.loadingTeams.push(team.id);
			const request = team.isLiked
				? this.http.delete(`/api/likes/${team.id}`, {params: {type: 'TEAM'}})
					.pipe(tap(() => team.likeAmount--))
				: this.http.post('/api/likes', {entityId: team.id, type: 'TEAM'})
					.pipe(tap(() => team.likeAmount++));
			return request.pipe(
				tap(() =>  this.loadingTeams.splice(this.loadingTeams.indexOf(team.id), 1))
			);
		} else return EMPTY;
	}

	starTeam(team: TeamSummary) {
		if (!this.loadingTeams.includes(team.id)) {
			this.loadingTeams.push(team.id);
			const request = team.isStared
				? this.http.delete(`/api/stars/${team.id}`, {params: {type: 'TEAM'}})
					.pipe(tap(() => team.starAmount--))
				: this.http.post('/api/stars', {entityId: team.id, type: 'TEAM'})
					.pipe(
						tap(() => team.starAmount++),
						tap(() => this.messageService.success('Добавлено в избранное!'))
					);
			return request.pipe(
				tap(() =>  this.loadingTeams.splice(this.loadingTeams.indexOf(team.id), 1))
			);
		} else return EMPTY;
	}
}
