import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {MatCardAvatar} from "@angular/material/card";
import {HttpClient} from "@angular/common/http";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-avatar',
  standalone: true,
	imports: [
		MatCardAvatar,
		NgIf
	],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

	url: string = '/assets/person.png';
	@Input({required: true})
	set userId(id: number) {
		this.url = '';
		this.http.head(`/api/users/${id}/avatar.jpg`)
			.subscribe({
				next: () => {
					this.url = `/api/users/${id}/avatar.jpg`;
					this.changeRef.detectChanges();
				},
				error: () => {
					this.url = '/assets/person.png';
					this.changeRef.detectChanges();
				}
			})
	}

	constructor(
		private changeRef: ChangeDetectorRef,
		private http: HttpClient
	) { }
}
