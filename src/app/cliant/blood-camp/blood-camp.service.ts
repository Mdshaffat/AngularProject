import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IPaginatedDonerInformation } from 'src/app/core/models/Doner/donerinfo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BloodCampService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDonerList(pageNumber: any, pageSize: any, bloodGroupId?: any, divisionId?: any, districtId?: any, upazilaId?: any){
    const params = new HttpParams()
                  .set('bloodGroupId', bloodGroupId)
                  .set('divisionId', divisionId)
                  .set('districtId', districtId)
                  .set('upazilaId', upazilaId)
                  .set('pageNumber', pageNumber)
                  .set('pageSize', pageSize);
    return this.http.get<IPaginatedDonerInformation>(this.baseUrl + 'donerinformation', {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  addDoners(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'donerinformation', values,  {headers}).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    );
  }

  getPregnantProfileById(id: number) {
    return this.http.get(this.baseUrl + 'pregnancy/pregnatewomanprofile/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }
}
