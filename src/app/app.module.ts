import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {QuillModule} from "ngx-quill";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';
import {MAT_DIALOG_DEFAULT_OPTIONS} from "@angular/material/dialog";
import {HandlerInterceptor} from "@services/handler.interceptor";
import {ServiceWorkerModule} from '@angular/service-worker';


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
    QuillModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    MessageService,
    {provide: LOCALE_ID, useValue: 'ru-Ru'},
    {provide: HTTP_INTERCEPTORS, useClass: HandlerInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {width: '80%', maxWidth: 580}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
