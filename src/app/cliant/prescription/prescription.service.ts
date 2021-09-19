import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {
  prescriptions: IPrescription[] = [];
  prescription!: IPrescription;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllPrescriptions(){
      if (this.prescriptions.length > 0) {
        return of(this.prescriptions);
      }
      return this.http.get<IPrescription[]>(this.baseUrl + 'prescription').pipe(
        map(response => {
          this.prescriptions = response;
          return response;
        })
      );
    }

    getPrescriptionById(id: number) {
      return this.http.get<IPrescription>(this.baseUrl + 'prescription/' + id).pipe(
        map(response => {
          this.prescription = response;
          return response;
        })
      );
    }

    addPrescription(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'prescription/postprescriptioncliant', values,  {headers}).pipe(
        map((response: IPrescription) => {
          if (response) {
            this.prescription = response;
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
