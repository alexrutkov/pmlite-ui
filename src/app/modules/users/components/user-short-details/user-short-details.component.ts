import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {UserShortDetails} from "@modules/users/model/UserShortDetails";
import {MatButton, MatIconButton} from "@angular/material/button";
import {
	MatCard,
	MatCardActions,
	MatCardAvatar,
	MatCardContent,
	MatCardFooter,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle
} from "@angular/material/card";
import {MatChip, MatChipSet} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {DatePipe, TitleCasePipe} from "@angular/common";
import {ShortNumberPipe} from "@pipes/short-number.pipe";
import {DefaultAvatarDirective} from "@directives/default-avatar.directive";
import {AvatarComponent} from "@components/avatar/avatar.component";
import {LikesService} from "@services/likes.service";

@Component({
	selector: 'app-user-short-details',
	standalone: true,
	imports: [
		MatButton,
		MatCard,
		MatCardActions,
		MatCardAvatar,
		MatCardContent,
		MatCardHeader,
		MatCardSubtitle,
		MatCardTitle,
		MatChip,
		MatChipSet,
		MatIcon,
		MatIconButton,
		RouterLink,
		TitleCasePipe,
		DatePipe,
		MatCardFooter,
		ShortNumberPipe,
		DefaultAvatarDirective,
		AvatarComponent
	],
	templateUrl: './user-short-details.component.html',
	styleUrl: './user-short-details.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserShortDetailsComponent {
	@Input() user!: UserShortDetails;

	constructor(
		public likeService: LikesService,
		private changeRef: ChangeDetectorRef
	) {
	}

	like() {
		this.likeService.likeUser(this.user)
			.subscribe(() => {
				this.user.isLiked = !this.user.isLiked;
				this.changeRef.detectChanges();
			});
	}

	star() {
		this.likeService.starUser(this.user)
			.subscribe(() => {
				this.user.isStared = !this.user.isStared;
				this.changeRef.detectChanges();
			});
	}
}
