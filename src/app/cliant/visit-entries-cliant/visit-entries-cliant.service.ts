import { HttpClient, HttpHeaders, HttpParams, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { IVisitEntryPagination } from 'src/app/core/models/VisitEntry/visitentrypagination';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitEntriesCliantService {visitEntries: IVisitEntry[] = [];
  visitEntry!: IVisitEntry;
  baseUrl = environment.apiUrl;
  lastSerialNumber: number;

    constructor(private http: HttpClient) { }

    getAllVisitEntry(searchString: string, sort: any, pageNumber: any, pageSize: any){
      const params = new HttpParams()
      .set('searchString', searchString)
      .set('sort', sort)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      const headersAndParams = { params, headers };
      return this.http.get<IVisitEntryPagination>(this.baseUrl + 'visitentry/getvisitentricliant', headersAndParams).pipe(
        map(response => {
          this.visitEntries = response.data;
          return response;
        })
      );
    }
    getlastvisitnumber() {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<number>(this.baseUrl + 'visitentry/latestserial/', {headers}).pipe(
        map(response => {
          return response;
        })
      );
    }
    getDateWisevisitNumber(date: string) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.get<number>(this.baseUrl + 'visitentry/latestserial/' + date, {headers}).pipe(
        map(response => {
          return response;
        })
      );
    }

    getLastVisitNumberAccordingToDateAndHospital(date: string, hospitalId?: any)
    {
      if (hospitalId !== undefined && hospitalId !== null){
        let params = new HttpParams();
        params = params.append('date', date);
        params = params.append('hospitalId', hospitalId);
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { params, headers };
        return this.http.get<number>(this.baseUrl + 'visitentry/lastserialbydateandhospital' , headersAndParams).pipe(
          map(response => {
            return response;
          })
        );
      } else {
        let params = new HttpParams();
        params = params.append('date', date);
        const token = localStorage.getItem('hotpital_user_token');
        let headers = new HttpHeaders();
        headers = headers.set('Authorization', `Bearer ${token}`);
        const headersAndParams = { params, headers };
        return this.http.get<number>(this.baseUrl + 'visitentry/lastserialbydateandhospital' , headersAndParams).pipe(
          map(response => {
            return response;
          })
        );
      }
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

    getVisitEntriesAccordingToHospital(searchString: string, sort: any, pageNumber: any, pageSize: any , hospitalId){
      const params = new HttpParams()
                    .set('hospitalId', hospitalId)
                    .set('searchString', searchString)
                    .set('sort', sort)
                    .set('pageNumber', pageNumber)
                    .set('pageSize', pageSize);
      // let params = new HttpParams();
      // params = params.append('hospitalId', hospitalId);
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      // const data: any = {hospitalId};
      // const httpParams: HttpParamsOptions = { fromObject: data } as HttpParamsOptions;
      const headersAndParams = { params, headers };

      return this.http.get<IVisitEntryPagination>(this.baseUrl + 'visitentry/getvisitentricliant', headersAndParams).pipe(
        map(response => {
          this.visitEntries = response.data;
          return response;
        })
      );
    }

    getTodayVisitEntriesAccordingToHospital(hospitalId){
      let params = new HttpParams();
      params = params.append('hospitalId', hospitalId);
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      // const data: any = {hospitalId};
      // const httpParams: HttpParamsOptions = { fromObject: data } as HttpParamsOptions;
      const headersAndParams = { params, headers };

      return this.http.get<IVisitEntry[]>(this.baseUrl + 'VisitEntry/todaysVisitcliant', headersAndParams).pipe(
        map(response => {
          this.visitEntries = response;
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
            return response;
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
