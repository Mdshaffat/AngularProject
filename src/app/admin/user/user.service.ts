import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: IUser[] = [];
  updateUserInterface!: IUser;
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllUser(){
    if (this.users.length > 0) {
      return of(this.users);
    }
    return this.http.get<IUser[]>(this.baseUrl + 'userManagement/userlist').pipe(
      map(response => {
        this.users = response;
        return response;
      })
    );
  }

  getUser(id: string) {
    return this.http.get<IUser>(this.baseUrl + 'userManagement/GetUser/' + id).pipe(
      map(response => {
        this.updateUserInterface = response;
        return response;
      })
    );
  }
  updateUser(values: any){
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(this.baseUrl + 'userManagement/updateuser', values, {headers}).pipe(
      map((response: any) => {
        console.log(response.message);
      })
    );
  }

}
