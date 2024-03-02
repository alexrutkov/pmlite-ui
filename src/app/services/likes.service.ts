import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {EMPTY, tap} from "rxjs";
import {UserShortDetails} from "@modules/users/model/UserShortDetails";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

	private loadingTasks: number[] = [];
	private loadingUsers: number[] = [];
  constructor(
		private http: HttpClient
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
}
