import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

	private loadingIds: number[] = [];
  constructor(
		private http: HttpClient
	) { }

	likeTask(task: TaskSummary) {
		if (!this.loadingIds.includes(task.id)) {
			this.loadingIds.push(task.id);
			const request = task.isLiked
				? this.http.delete(`/api/likes/${task.id}`, {params: {type: 'TASK'}})
					.pipe(tap(() => task.likeAmount--))
				: this.http.post('/api/likes', {entityId: task.id, type: 'TASK'})
					.pipe(tap(() => task.likeAmount++));
			request.subscribe(() => {
				task.isLiked = !task.isLiked;
				this.loadingIds.splice(this.loadingIds.indexOf(task.id), 1);
			});
		}


	}
}
