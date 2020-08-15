import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../../shared/models/token-response.model';
import { UserModel } from '../../shared/models/user.model';
import { UserLogin } from '../../shared/models/user-login.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public token: TokenResponse;
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient,  private router: Router) {
    this.token = JSON.parse(localStorage.getItem('token'));
    this.loggedIn.next(this.token != null);
   }

  get isLoggedIn(): Observable<boolean>{
    return this.loggedIn.asObservable();
  }

  login(loginViewModel: UserLogin): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(environment.apiURL + '/auth/', loginViewModel).pipe(
      map(tokenResponse => {
        this.token = tokenResponse;
        localStorage.setItem('token', JSON.stringify(this.token));
        this.loggedIn.next(true);
        return tokenResponse;
      }));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token = null;
    this.loggedIn.next(false);
    this.router.navigate(['']);
  }
}
