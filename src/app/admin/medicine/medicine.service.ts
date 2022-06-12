import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IMedicineForSearch } from 'src/app/core/models/Medicine/IMedicineForSearch';
import { IManufacturar } from 'src/app/core/models/Medicine/manufacturar';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { IMedicinePagination } from 'src/app/core/models/Medicine/medicinePagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  medicines: IMedicine[] = [];
  medicine!: IMedicine;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllMedicine(searchString: string, sort: any, pageNumber: any, pageSize: any){
      const params = new HttpParams()
                    .set('searchString', searchString)
                    .set('sort', sort)
                    .set('pageNumber', pageNumber)
                    .set('pageSize', pageSize);
      return this.http.get<IMedicinePagination>(this.baseUrl + 'medicine', {params}).pipe(
        map(response => {
          return response;
        })
      );
    }
    // /api/Medicine//api/Medicine/getmedicineforsearch
    getmedicineForSearch(searchString: string){
      const params = new HttpParams()
                    .set('search', searchString);
      return this.http.get<IMedicineForSearch[]>(this.baseUrl + 'medicine/getmedicineforsearch', {params}).pipe(
        map(response => {
          return response;
        })
      );
    }

        // /manufacturarforsearch
    getManufacturar(search: string){
      const params = new HttpParams()
                    .set('search', search);
      return this.http.get<IManufacturar[]>(this.baseUrl + 'medicine/manufacturarforsearch', {params}).pipe(
        map(response => {
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
            return response;
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
