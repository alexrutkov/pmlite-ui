import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {AgreementShortDetailsComponent} from "@components/agreement-short-details/agreement-short-details.component";

const routes: Routes = [
  {path: '', component: MainComponent}
];

@NgModule({
  declarations: [
    MainComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AgreementShortDetailsComponent
    ]
})
export class HistoryModule { }
