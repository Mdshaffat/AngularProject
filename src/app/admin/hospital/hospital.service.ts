import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  hospital: IHospital[] = [];
  updatehospital!: IHospital;
  baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getAllHospital(){
      if (this.hospital.length > 0) {
        return of(this.hospital);
      }
      return this.http.get<IHospital[]>(this.baseUrl + 'hospital').pipe(
        map(response => {
          this.hospital = response;
          return response;
        })
      );
    }

    getHospitalById(id: number) {
      return this.http.get<IHospital>(this.baseUrl + 'hospital/gethospital/' + id).pipe(
        map(response => {
          this.updatehospital = response;
          return response;
        })
      );
    }

  addHospital(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'hospital', values,  {headers}).pipe(
      map((response: any) => {
        if (response) {
          console.log(response.message);
        }
      })
    );
  }
    updateHospital(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'hospital', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
}
