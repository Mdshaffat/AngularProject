import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IPhysicalStatPagination } from 'src/app/core/models/PhysicalState/physicalstatPagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhysicalStateService {
  physicalStates: IPhysicalState[] = [];
  physicalState!: IPhysicalState;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllPhysicalStates(searchString: string, sort: any, pageNumber: any, pageSize: any){
      const params = new HttpParams()
      .set('searchString', searchString)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
      return this.http.get<IPhysicalStatPagination>(this.baseUrl + 'physicalState', {params}).pipe(
        map(response => {
          return response;
        })
      );
    }

    getPhysicalStateById(id: number) {
      return this.http.get<IPhysicalState>(this.baseUrl + 'physicalState/' + id).pipe(
        map(response => {
          this.physicalState = response;
          return response;
        })
      );
    }

    addPhysicalState(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'physicalstate', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
    updatePhysicalState(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'physicalstate', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
}
