import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitEntriesCliantService {visitEntries: IVisitEntry[] = [];
  visitEntry!: IVisitEntry;
  baseUrl = environment.apiUrl;
  lastSerialNumber: number;

    constructor(private http: HttpClient) { }

    getAllVisitEntry(){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<IVisitEntry[]>(this.baseUrl + 'visitentry/getvisitentricliant', {headers}).pipe(
        map(response => {
          this.visitEntries = response;
          return response;
        })
      );
    }
    getlastvisitnumber() {
      return this.http.get<number>(this.baseUrl + 'visitentry/latestserial').pipe(
        map(response => {
          return response;
        })
      );
    }
    getAllCurrentDayVisitEntry(){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<IVisitEntry[]>(this.baseUrl + 'VisitEntry/todaysVisitcliant', {headers}).pipe(
        map(response => {
          this.visitEntries = response;
          return response;
        })
      );
    }
    getVisitEntryById(id: number) {
      return this.http.get<IVisitEntry>(this.baseUrl + 'visitentry' + id).pipe(
        map(response => {
          this.visitEntry = response;
          return response;
        })
      );
    }

    addVisitEntry(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'visitentry/postvisitentrybyuser', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
    updateVisitEntry(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'visitentry/putvisitentrycliant', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
    updateVisitEntryStatus(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'VisitEntry/putvisitentrystatus', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }
}
