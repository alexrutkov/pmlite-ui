import {Component, Input} from '@angular/core';
import {MatChip, MatChipListbox} from "@angular/material/chips";
import {Tag} from "@modules/tags/model/Tag";
import {AsyncPipe} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatListItem, MatListItemMeta} from "@angular/material/list";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TagsStore} from "@modules/tags/stores/tags.store";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-tags',
  standalone: true,
	imports: [
		MatChip,
		MatChipListbox,
		AsyncPipe,
		MatCheckbox,
		MatIcon,
		MatIconButton,
		MatListItem,
		MatListItemMeta,
		MatMenu,
		MatMenuItem,
		MatMenuTrigger
	],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent {

	@Input({required: true}) tags: Tag[] = [];

	constructor(
		private tagsStore: TagsStore,
		private messageService: MessageToastService
	) {
	}

	addToSearch(tag: Tag) {
		this.tagsStore.addTags([tag])
			.subscribe(() => this.messageService.success('Тег добавлен для поиска'));
	}
}
