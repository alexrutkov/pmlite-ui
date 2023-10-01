import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {provideComponentStore} from "@ngrx/component-store";
import {TasksStore} from "@stores/tasks.store";
import {QuillModule} from "ngx-quill";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {AccountStore} from "@stores/account.store";


registerLocaleData(localeRu, 'ru');
@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
        AppRoutingModule,
        ToastModule,
      QuillModule.forRoot()
    ],
  providers: [
    MessageService,
    {provide: LOCALE_ID, useValue: 'ru-Ru'},
    provideComponentStore(TasksStore),
    provideComponentStore(AccountStore),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
