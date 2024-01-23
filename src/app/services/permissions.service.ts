import {Injectable} from '@angular/core';
import {Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticationService} from "@services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  publicFallbackPageUri = '/login';
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  /**
   * Check, if current page is public fallback page
   */
  private isPublicPage(url: string): boolean {
    return url === this.publicFallbackPageUri;
  }

  canMatch(segments: UrlSegment[]): Observable<boolean | UrlTree> {
    console.log(segments)
    return this.authService.isAuthorized()
      .pipe(map((isAuthorized: boolean ) => {
        const url = segments.map(s => s.path).join('/');
        if (!isAuthorized && !this.isPublicPage(url)) {
          this.authService.setInterruptedUrl(url);
          return this.router.parseUrl(this.publicFallbackPageUri);
        }
        return true;
      }));
  }

}
