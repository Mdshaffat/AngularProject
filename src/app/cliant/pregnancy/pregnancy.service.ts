import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPaginatedPregnancy } from 'src/app/core/models/pregnancyModel/paginatedPregnancy';
import { IPrenantProfile } from 'src/app/core/models/pregnancyModel/pregnatProfile';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PregnancyService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllPregnancy(searchString: string, sort: any, pageNumber: any, pageSize: any, hospitalId: any){
    const params = new HttpParams()
                  .set('searchString', searchString)
                  .set('sort', sort)
                  .set('pageNumber', pageNumber)
                  .set('pageSize', pageSize)
                  .set('hospitalId', hospitalId);
    return this.http.get<IPaginatedPregnancy>(this.baseUrl + 'pregnancy', {params}).pipe(
      map(response => {
        return response;
      })
    );
  }
  getAllTodayPregnancy(searchString: string, sort: any, pageNumber: any, pageSize: any, hospitalId: any){
    const params = new HttpParams()
                  .set('searchString', searchString)
                  .set('sort', sort)
                  .set('pageNumber', pageNumber)
                  .set('pageSize', pageSize)
                  .set('hospitalId', hospitalId);
    return this.http.get<IPaginatedPregnancy>(this.baseUrl + 'pregnancy/todaylist', {params}).pipe(
      map(response => {
        return response;
      })
    );
  }
  addPregnancy(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'pregnancy', values,  {headers}).pipe(
      map((response: any) => {
        if (response) {
          console.log(response.message);
        }
      })
    );
  }
  addCheckup(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'pregnancy/monthlycheckup', values,  {headers}).pipe(
      map((response: any) => {
        if (response) {
          console.log(response);
        }
      })
    );
  }
  getPregnantProfileById(id: number) {
    return this.http.get<IPrenantProfile>(this.baseUrl + 'pregnancy/pregnatewomanprofile/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }
}
