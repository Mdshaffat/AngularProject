import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUserNameAndPatientCount } from 'src/app/core/models/homepagepopup/userNameAndPaientCount';
import { HomePageReport } from 'src/app/core/models/Report/homepagereport';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }



  getCurrentMonthPatientReport() {
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { headers };
    return this.http.get<HomePageReport>(this.baseUrl + 'homepagereport/currentmonthpatientreport', headersAndParams).pipe(
                    map(response => {
                      return response;
                    })
                  );
  }
  getPreviousMonthPatientReport() {
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { headers };
        return this.http.get<HomePageReport>(this.baseUrl + 'homepagereport/previousmonthpatientreport', headersAndParams).pipe(
                        map(response => {
                          return response;
                        })
                      );
      }

  getCurrentMonthPrescriptionReport() {
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { headers };
        return this.http.get<HomePageReport>(this.baseUrl + 'homepagereport/currentmonthprescriptionreport', headersAndParams).pipe(
                        map(response => {
                          return response;
                        })
                      );
      }
  getPreviousMonthPrescriptionReport() {
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { headers };
        return this.http.get<HomePageReport>(this.baseUrl + 'homepagereport/previousmonthprescriptionreport', headersAndParams).pipe(
                        map(response => {
                          return response;
                        })
                      );
      }

      getCurrentUserNameAndTotalPatientReport() {
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { headers };
        return this.http.get<IUserNameAndPatientCount>(this.baseUrl + 'homepagereport/usernameandtotalpatient', headersAndParams).pipe(
                        map(response => {
                          return response;
                        })
                      );
      }
}
