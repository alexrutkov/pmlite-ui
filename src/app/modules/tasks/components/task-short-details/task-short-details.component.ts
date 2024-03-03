import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TaskSummary} from "@modules/tasks/model/TaskSummary";
import {LikesService} from "@services/likes.service";

@Component({
  selector: 'app-task-short-details',
  templateUrl: './task-short-details.component.html',
  styleUrl: './task-short-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskShortDetailsComponent {

  @Input() task!: TaskSummary;

	constructor(
		public likeService: LikesService,
		private changeRef: ChangeDetectorRef
	) {
	}

	like() {
		this.likeService.likeTask(this.task)
			.subscribe(() => {
				this.task.isLiked = !this.task.isLiked;
				this.changeRef.detectChanges();
			});
	}

	star() {
		this.likeService.starTask(this.task)
			.subscribe(() => {
				this.task.isStared = !this.task.isStared;
				this.changeRef.detectChanges();
			});
	}
}
