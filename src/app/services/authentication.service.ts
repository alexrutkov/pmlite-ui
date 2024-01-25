import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {MessageToastService} from "@services/message.service";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private interruptedUrl = '/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageToastService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  public isAuthorized(): Observable < boolean > {
      return this.http.get('/api/authorization/isAuthorized')
        .pipe(
          map(() => true),
          catchError(err => {
            this.messageService.error(`${err.status}: ${err.statusText}`);
            if (err.status === 502 || err.status === 504) {
              return of(true);
            }
            return of(false);
          })
        );
  }

  public setInterruptedUrl(url: string): void {
    this.interruptedUrl = url;
  }

  public login(user: { username: string; password: string}): Observable<any> {
    const formData = new FormData();
    formData.append('password', user.password.trim());
    formData.append('username', user.username.trim());
    return this.http.post(`/api/authorization/createToken`, formData, {withCredentials: true})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 422) {
            this.messageService.error('Неверный логин или пароль!');
          }
          return throwError(() => new Error(err.message));
        }));
  }

  public logout(): void {
    if (confirm('Вы уверены, что хотите выйти из учетной записи?')) {
      this.http.post(`/logout`, null)
        .subscribe(() => {
          this.messageService.info('Хорошего дня!');
          this.router.navigate(['/login']);
        });
    }
  }

  updateCsrf(): Observable<any> {
    return this.http.get(`/api/authorization/csrf`);
  }
}
