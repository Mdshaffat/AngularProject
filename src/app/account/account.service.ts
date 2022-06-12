import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRole } from '../core/models/role';
import { IUserTokenProvider } from '../core/models/UserTokenProvider';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  roles: IRole[] = [];
  baseUrl = environment.apiUrl;
  jwtToken: string;
  decodedToken: { [key: string]: string };
  private currentUserSource = new ReplaySubject<IUserTokenProvider>(1);
  currentUser$ = this.currentUserSource.asObservable();
  private isAdminSource = new ReplaySubject<boolean>(1);
  isAdmin$ = this.isAdminSource.asObservable();
  private isDoctorSource = new ReplaySubject<boolean>(1);
  isDoctor$ = this.isDoctorSource.asObservable();
  private isdesignationDoctorSource = new ReplaySubject<boolean>(1);
  isdesignationDoctor$ = this.isdesignationDoctorSource.asObservable();

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
          localStorage.setItem('hotpital_user_token', user.token);
          localStorage.setItem('email', user.email);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
          this.isDoctorSource.next(this.isDoctor(user.token));
          this.isdesignationDoctorSource.next(this.isDesignationDoctor(user.token));
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
  isDoctor(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.role.indexOf('Doctor') > -1) {
        return true;
      }
    }
  }

  isDesignationDoctor(token: string): boolean {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.designation.indexOf('Doctor') > -1) {
        return true;
      }
    }
  }

  login(values: any) {
    return this.http.post(this.baseUrl + 'account/login', values).pipe(
      map((user: IUserTokenProvider) => {
        if (user) {
          localStorage.setItem('hotpital_user_token', user.token);
          localStorage.setItem('email', user.email);
          this.currentUserSource.next(user);
          this.isAdminSource.next(this.isAdmin(user.token));
          this.isDoctorSource.next(this.isDoctor(user.token));
        }
      })
    );
  }

  register(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'account/registration', values, {headers}).pipe(
      map((user: any) => {
        if (user) {
          console.log(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('hotpital_user_token');
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
      return this.http.get<IRole[]>(this.baseUrl + 'UserManagement/rolelist').pipe(
        map(response => {
          this.roles = response;
          return response;
        })
      );
    }
  }

  getDecoadedHospitalIdFromToken(){
    const token = localStorage.getItem('hotpital_user_token');
    if (token) {
      this.decodedToken = jwt_decode(token);
    }
    return this.decodedToken ? this.decodedToken.HospitalId : null;
  }

}
