import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {TeamSummary} from "@modules/teams/model/TeamSummary";
import {DatePipe} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardContent,
	MatCardFooter,
	MatCardHeader,
	MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {ShortNumberPipe} from "@pipes/short-number.pipe";
import {RouterLink} from "@angular/router";
import {LikesService} from "@services/likes.service";

@Component({
  selector: 'app-team-short-details',
  standalone: true,
	imports: [
		DatePipe,
		MatButton,
		MatCard,
		MatCardActions,
		MatCardContent,
		MatCardFooter,
		MatCardHeader,
		MatCardTitle,
		MatIcon,
		ShortNumberPipe,
		RouterLink
	],
  templateUrl: './team-short-details.component.html',
  styleUrl: './team-short-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamShortDetailsComponent {

	@Input({required: true}) team!: TeamSummary;

	constructor(
		public likeService: LikesService,
		private changeRef: ChangeDetectorRef
	) {
	}

	like() {
		this.likeService.likeTeam(this.team)
			.subscribe(() => {
				this.team.isLiked = !this.team.isLiked;
				this.changeRef.detectChanges();
			});
	}

	star() {
		this.likeService.starTeam(this.team)
			.subscribe(() => {
				this.team.isStared = !this.team.isStared;
				this.changeRef.detectChanges();
			});
	}
}
