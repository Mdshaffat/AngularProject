import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRole } from '../core/models/role';
import { IUserTokenProvider } from '../core/models/UserTokenProvider';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  roles: IRole[] = [];
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<IUserTokenProvider>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  loadCurrentUser(token: string) {
    if (token == null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'account', {headers}).pipe(
      map((user: IUserTokenProvider) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  isAdmin(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Admin') > -1) {
        return true;
      }
    }
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUserTokenProvider) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
        }
      })
    );
  }

  register(values: any) {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'account/registration', values, {headers}).pipe(
      map((user: IUserTokenProvider) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('account/login');
  }

  sendForgotPasswordEmail(values: string) {
    return this.http.post<any>(this.baseUrl + 'account/forgotpassword/' + values, {}).pipe(
       map(
         (result) => {
           return result;
         },
         (error: any) => {
           return error;
         }
       )
     );
   }
   resetPassword(values: any) {
     return this.http.post<any>(this.baseUrl + 'account/resetPassword', values).pipe(
        map(
          (result) => {
            return result;
          },
          (error: any) => {
            return error;
          }
        )
      );
    }

  checkEmailExists(email: string) {
    return this.http.get(this.baseUrl + 'account/emailexists?email=' + email);
  }

  getAllRole(){
    {
      if (this.roles.length > 0) {
        return of(this.roles);
      }
      return this.http.get<IRole[]>('https://localhost:5001/api/UserManagement/rolelist').pipe(
        map(response => {
          this.roles = response;
          return response;
        })
      );
    }
  }
}
