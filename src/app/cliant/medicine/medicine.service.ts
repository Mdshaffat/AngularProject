import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  medicines: IMedicine[] = [];
  medicine!: IMedicine;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllMedicine(){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<IMedicine[]>(this.baseUrl + 'medicine', {headers}).pipe(
        map(response => {
          this.medicines = response;
          return response;
        })
      );
    }

    getMedicineById(id: number) {
      return this.http.get<IMedicine>(this.baseUrl + 'medicine/' + id).pipe(
        map(response => {
          this.medicine = response;
          return response;
        })
      );
    }

    addMedicine(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'medicine', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
    postPurchaseMedicine(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'medicinepurchase', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            return response;
          }
        })
      );
    }
    updateMedicine(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'medicine', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }

}
