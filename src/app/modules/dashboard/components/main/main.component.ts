import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AccountState} from "@modules/account/model/AccountState";
import {AccountStore} from "@stores/account.store";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private accountStore: AccountStore
  ) {
  }
  ngOnInit(): void {
    this.http.get<AccountState>('/assets/account.json', {responseType: 'json'})
      .subscribe(s => this.accountStore.setState(() => s));
  }


}
