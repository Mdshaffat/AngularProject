import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IPrescriptionWithVital } from 'src/app/core/models/Prescriptions/getPrescriptionWithVital';
import { IprescriptionPagination } from 'src/app/core/models/Prescriptions/prescriptionPagination';
import { IPrescriptionWithPhysicalStatAndDiagnosis } from 'src/app/core/models/Prescriptions/prescriptionWithPhysicalStatAdnDiagnosis';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  prescriptions: IPrescription[] = [];
  prescription!: IPrescription;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllPrescriptions(searchString: string, sort: any, pageNumber: any, pageSize: any){
      const params = new HttpParams()
                    .set('searchString', searchString)
                    .set('sort', sort)
                    .set('pageNumber', pageNumber)
                    .set('pageSize', pageSize);
      return this.http.get<IprescriptionPagination>(this.baseUrl + 'prescription', {params}).pipe(
        map(response => {
          return response;
        })
      );
    }

    getPrescriptionById(id: number) {
      return this.http.get<IPrescriptionWithPhysicalStatAndDiagnosis>(this.baseUrl + 'prescription/' + id).pipe(
        map(response => {
          return response;
        })
      );
    }

    addPrescription(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'prescription/postprescriptioncliant', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
    }
    updatePrescription(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'prescription', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
}
