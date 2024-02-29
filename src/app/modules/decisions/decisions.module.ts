import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "@modules/decisions/components/main/main.component";
import {DecisionsComponent} from "@modules/decisions/components/decisions/decisions.component";
import {DECISIONS_URL} from "@modules/decisions/tokens";

const routes: Routes = [
  {
		path: '',
		component: MainComponent,
		children: [
			{path: '', redirectTo: 'all', pathMatch: 'full'},
			{
				path: 'all',
				component: DecisionsComponent,
				providers: [{provide: DECISIONS_URL, useValue: '/api/decisions'}]
			},
			{
				path: 'my',
				component: DecisionsComponent,
				providers: [{provide: DECISIONS_URL, useValue: '/api/decisions/my'}]
			},
		]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class DecisionsModule { }
