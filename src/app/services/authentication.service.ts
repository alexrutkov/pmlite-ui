import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private interruptedUrl = '/api';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  public isAuthorized(): Observable < boolean > {
      return this.http.get('/is-authorized')
        .pipe(
          map(() => {
            return true;
          }),
          catchError(err => {
            this.messageService.add({severity: 'error', summary: `${err.status}: ${err.statusText}`})

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
    return this.http.post(`/create-token`, formData, {withCredentials: true})
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 422) {
            this.messageService.add({severity: 'error', summary: 'Неверный логин или пароль!'})
          }
          return throwError(() => new Error(err.message));
        }));
  }

  public logout(): void {
    if (confirm('Вы уверены, что хотите выйти из учетной записи?')) {
      this.http.post(`/logout`, null)
        .subscribe(() => {
          this.router.navigate(['/login']);
          this.messageService.add({severity: 'info', summary: 'Хорошего дня!'});
        });
    }
  }
}
