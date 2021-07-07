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

    getHospitalById(id: string) {
      return this.http.get<IHospital>(this.baseUrl + 'hospital' + id).pipe(
        map(response => {
          this.updatehospital = response;
          return response;
        })
      );
    }
    updateHospital(values: any){
      const token = localStorage.getItem('token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'hospital/updatehospital', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
  }