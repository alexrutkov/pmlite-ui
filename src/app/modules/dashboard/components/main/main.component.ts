import {Component, OnInit} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {UserRole} from "@modules/account/model/AccountRole";
import {AgreementDetailsStore} from "@modules/agreements/stores/agreement-details.store";
import {TagsStore} from "@modules/tags/stores/tags.store";
import {concatMap, filter} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountTagComponent} from "@modules/tags/components/add-account-tag/add-account-tag.component";
import {MessageToastService} from "@services/message.service";
import {AccountTagsDialogComponent} from "@modules/tags/components/account-tags/account-tags.dialog.component";
import {Clipboard} from '@angular/cdk/clipboard';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

	enableCreateTask$ = this.accountStore.hasRole(UserRole.ROLE_TASK_CREATOR);
	selectedTags$ = this.tagsStore.select(
		tags => tags.filter(t => t.state == 'ACTIVE').length
	);
	totalAgreements$ = this.agreementStore.totalAgreements();

	constructor(
		public accountStore: AccountStore,
		public tagsStore: TagsStore,
		private agreementStore: AgreementDetailsStore,
		private messageService: MessageToastService,
		private matDialog: MatDialog,
		private clipboard: Clipboard
	) {
	}

	ngOnInit(): void {
	}


	addAccountTag() {
		this.matDialog.open(AddAccountTagComponent, {minWidth: 300})
			.afterClosed()
			.pipe(
				filter(t => !!t),
				concatMap(t => this.tagsStore.addTags(t))
			).subscribe(() => this.messageService.success('Теги добавлены!'));
	}

	manageAccountTags() {
		this.matDialog.open(AccountTagsDialogComponent, {minWidth: 300})
	}

	copySupport() {
		this.clipboard.copy('support@pmlite.ru');
		this.messageService.success('Адрес скопирован!');
	}
}
