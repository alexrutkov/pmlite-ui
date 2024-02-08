import {Injectable} from '@angular/core';
import {HttpXsrfTokenExtractor} from "@angular/common/http";
import {RxStomp} from "@stomp/rx-stomp";
import {WebsocketEvent, WebsocketEventType} from "@core/WebsocketEvent";
import {filter, Observable} from "rxjs";
import {map} from "rxjs/operators";

declare var SockJS: any;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  serverUrl = '/websocketApp';
  rxStomp = new RxStomp();

  acountEvents$: Observable<WebsocketEvent>;


  constructor(
    private xsrfTokenExtractor: HttpXsrfTokenExtractor
  ) {
    this.rxStomp.configure({
      reconnectDelay: 2500,
      webSocketFactory: () => new SockJS(this.serverUrl)
    });
    this.rxStomp.activate();
    this.acountEvents$ = this.rxStomp.watch({destination: '/user/topic/events'})
      .pipe(map(m => JSON.parse(m.body) as WebsocketEvent));
  }

  watchEventsByType(type: WebsocketEventType) {
    return this.acountEvents$.pipe(
      filter(e => e.type == type)
    )
  }
}
