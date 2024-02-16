import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './components/main/main.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {DashboardRoutingModule} from "@modules/dashboard/dashboard-routing.module";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MenuComponent} from './components/menu/menu.component';
import {MatListModule} from "@angular/material/list";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {provideComponentStore} from "@ngrx/component-store";
import {AccountStore} from "@modules/account/account.store";
import {MatBadge} from "@angular/material/badge";
import {AgreementDetailsStore} from "@modules/agreements/agreement-details.store";


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        DashboardRoutingModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        OverlayPanelModule,
        MatMenuModule,
        MatExpansionModule,
        MatBadge
    ],
  providers: [
    provideComponentStore(AccountStore),
    provideComponentStore(AgreementDetailsStore),
  ]
})
export class DashboardModule {
}
