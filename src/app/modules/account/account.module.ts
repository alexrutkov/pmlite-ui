import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './components/profile/profile.component';
import {PrivacyComponent} from './components/privacy/privacy.component';
import {NotificationsComponent} from './components/notifications/notifications.component';
import {ChangePasswordComponent} from './components/change.password/change.password.component';
import {RouterModule, Routes} from "@angular/router";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {SelectTagsComponent} from "@components/select-tags/select-tags.component";

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'notifications', component: NotificationsComponent},
];

@NgModule({
  declarations: [
    ProfileComponent,
    PrivacyComponent,
    NotificationsComponent,
    ChangePasswordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    PaginatorModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatAutocompleteModule,
    SelectTagsComponent
  ]
})
export class AccountModule { }
