import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembershipBranchService {
  branches: IBranch[] = [];
  branch!: IBranch;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllBranches(){
      if (this.branches.length > 0) {
        return of(this.branches);
      }
      return this.http.get<IBranch[]>(this.baseUrl + 'branch').pipe(
        map(response => {
          this.branches = response;
          return response;
        })
      );
    }

    getBranchById(id: number) {
      return this.http.get<IBranch>(this.baseUrl + 'branch/' + id).pipe(
        map(response => {
          this.branch = response;
          return response;
        })
      );
    }

    addBranch(values: any) {
      const token = localStorage.getItem('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'branch', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
    updateBranch(values: any){
      const token = localStorage.getItem('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'branch/editbranch', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
}
