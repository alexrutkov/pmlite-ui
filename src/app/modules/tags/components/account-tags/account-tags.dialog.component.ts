import {Component} from '@angular/core';
import {TagsStore} from "@modules/tags/stores/tags.store";
import {MatDialogModule} from "@angular/material/dialog";
import {MatListModule} from "@angular/material/list";
import {AsyncPipe} from "@angular/common";
import {AccountTag} from "@modules/tags/model/AccountTag";
import {MatCheckbox, MatCheckboxChange} from "@angular/material/checkbox";
import {MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MessageToastService} from "@services/message.service";
import {filter} from "rxjs";

@Component({
	selector: 'app-account-tags',
	standalone: true,
	imports: [
		MatDialogModule,
		MatListModule,
		AsyncPipe,
		MatCheckbox,
		MatIconButton,
		MatIcon
	],
	templateUrl: './account-tags.dialog.component.html',
	styleUrl: './account-tags.dialog.component.scss'
})
export class AccountTagsDialogComponent {

	tags$ = this.tagsStore.select(t => t);
	constructor(
		private tagsStore: TagsStore,
		private messageService: MessageToastService
	) {
	}

	toggleTag(tag: AccountTag, event: MatCheckboxChange) {
		this.tagsStore.toggleTagState(tag, event.checked)
	}


	deleteTag(tag: AccountTag) {
		this.messageService.confirm('Вы уверены, что хотите удалить тег из списка?')
			.pipe(
				filter(isConfirmed => isConfirmed)
			).subscribe(() => this.tagsStore.deleteTag(tag));

	}
}
