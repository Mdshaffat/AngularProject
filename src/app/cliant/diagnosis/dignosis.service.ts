import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IDiseases } from 'src/app/core/models/Diagnosis/diseases';
import { IDiseasesCategory } from 'src/app/core/models/Diagnosis/diseasesCategory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DignosisService {

  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  /// api/Diagnoses/diseasescategory

  getDiseasesCategory() {
    return this.http.get<IDiseasesCategory[]>(this.baseUrl + 'diagnoses/diseasescategory').pipe(
      map(response => {
        return response;
      })
    );
  }

  getDiseasesByCategoryId(id: number) {
    return this.http.get<IDiseases[]>(this.baseUrl + 'diagnoses/diseasesbycategoryid/' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

  addDiseases(values: any) {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.post(this.baseUrl + 'diagnoses/adddiseases', values,  {headers}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
