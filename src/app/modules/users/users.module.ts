import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MainComponent} from '@modules/users/components/main/main.component';
import {RouterModule, Routes} from "@angular/router";
import {MatTabsModule} from "@angular/material/tabs";
import {UsersComponent} from '@modules/users/components/users/users.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {USERS_URL} from "@modules/users/tokens";
import {CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {UserShortDetailsComponent} from "@modules/users/components/user-short-details/user-short-details.component";
import {UserDetailsRouteComponent} from "@modules/users/components/user-details.route/user-details.route.component";
import {SearchComponent} from "@components/search/search.component";
import {ReactiveFormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'all', pathMatch: 'full'},
      {
        path: 'all',
        component: UsersComponent,
        providers: [{provide: USERS_URL, useValue: '/api/users/all'}]
      },
      {
        path: 'my',
        component: UsersComponent,
        providers: [{provide: USERS_URL, useValue: '/api/users/my'}]
      },
    ]
  },
  {path: ':userId', component: UserDetailsRouteComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    UsersComponent
  ],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		MatTabsModule,
		MatListModule,
		NgOptimizedImage,
		MatCardModule,
		MatChipsModule,
		MatButtonModule,
		MatIconModule,
		CdkFixedSizeVirtualScroll,
		CdkVirtualForOf,
		CdkVirtualScrollViewport,
		UserShortDetailsComponent,
		SearchComponent,
		ReactiveFormsModule
	]
})
export class UsersModule { }
