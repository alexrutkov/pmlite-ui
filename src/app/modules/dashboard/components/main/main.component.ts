import {Component, OnInit} from '@angular/core';
import {AccountStore} from "@modules/account/account.store";
import {UserRole} from "@modules/account/model/AccountRole";
import {AgreementDetailsStore} from "@modules/agreements/agreement-details.store";
import {TagsStore} from "@modules/tags/stores/tags.store";
import {concatMap, EMPTY, filter, of} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountTagComponent} from "@modules/tags/components/add-account-tag/add-account-tag.component";
import {MessageToastService} from "@services/message.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  enableCreateTask$ = this.accountStore.hasRole(UserRole.ROLE_TASK_CREATOR);
  selectedTags$ = this.tagsStore.select(t => t.length)
    .pipe(concatMap(t => t > 0 ? of(t) : EMPTY));
  totalAgreements$ = this.agreementStore.totalAgreements();
  constructor(
    public accountStore: AccountStore,
    public tagsStore: TagsStore,
    private agreementStore: AgreementDetailsStore,
    private messageService: MessageToastService,
    private matDialog: MatDialog
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

  }
}
