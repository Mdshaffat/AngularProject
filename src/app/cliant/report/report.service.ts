import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IFollowup } from 'src/app/core/models/FollowUp/followup';
import { IFollowUpPagination } from 'src/app/core/models/FollowUp/followuppaginations';
import { IDiseasesCategoryReport } from 'src/app/core/models/Report/diseasesCategoryReport';
import { IMedicalReport } from 'src/app/core/models/Report/madicalReport';
import { INewPatientCreatedByDateAndBranch, IPatientsCountAccordingToBranchBetweenTwoDates } from 'src/app/core/models/Report/NewPatientCreatedByDate';
import { Revenue } from 'src/app/core/models/Report/revenue';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getNewPatientListAccordingToDateAndBranch(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<IPatientsCountAccordingToBranchBetweenTwoDates>(this.baseUrl + 'reports', headersAndParams).pipe(
      map(response => {
        return response;
      })
    );
  }
  getNewPrescriptionListAccordingToDateAndBranch(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<IPatientsCountAccordingToBranchBetweenTwoDates>(this.baseUrl + 'reports/getprescriptionreport', headersAndParams).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  getRevenueAccordingToDateAndBranch(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<Revenue>(this.baseUrl + 'reports/getrevenuereport', headersAndParams).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }
  getTelimedicineListAccordingToDateAndBranch(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<IPatientsCountAccordingToBranchBetweenTwoDates>(this.baseUrl + 'reports/gettelimedicinereport', headersAndParams).pipe(
      map(response => {
        return response;
      })
    );
  }
  getPendingFollowUp(searchString: string, sort: any, pageNumber: any, pageSize: any , hospitalId: number) {
    const params = new HttpParams()
                    .set('searchString', searchString)
                    .set('sort', sort)
                    .set('pageNumber', pageNumber)
                    .set('pageSize', pageSize);
    return this.http.get<IFollowUpPagination>(this.baseUrl + 'followup/getpendingfollowup/' + hospitalId, {params}).pipe(
      map(response => {
        return response;
      })
    );
  }

  // Get Diseases Report CategoryWise
  getDiseasesReport(month: any, year: any, hospitalId: any){
    const params = new HttpParams()
                  .set('month', month)
                  .set('year', year)
                  .set('hospitalId', hospitalId);

    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<IDiseasesCategoryReport>(this.baseUrl + 'diagnosisreport/diagnosiscategoryreport', headersAndParams).pipe(
      map(response => {
        return response;
      })
    );
  }

  getMedicalReport(patientId: any) {
    const params = new HttpParams()
                  .set('patientId', patientId);

    const token = localStorage.getItem('hotpital_user_token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    const headersAndParams = { params, headers };
    return this.http.get<IMedicalReport>(this.baseUrl + 'medicalreport', headersAndParams).pipe(
                    map(response => {
                      return response;
                    })
                  );
  }
}
