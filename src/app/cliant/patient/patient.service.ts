import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPatientVital } from 'src/app/core/models/Patient/addPatientVital';
import { IPatientWithVital } from 'src/app/core/models/Patient/getPatientWithVital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPatientForSearch } from 'src/app/core/models/Patient/patientForSearch';
import { IPatientHistory } from 'src/app/core/models/Patient/patientHistory';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients: IPatient[] = [];
  patientForSearch: IPatientForSearch[] = [];
  patient!: IPatientWithVital;
  patientVital: IPatientVital;
  patientHistory: IPatientHistory;
  baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    getAllPatient(){
      return this.http.get<IPatient[]>(this.baseUrl + 'patient').pipe(
        map(response => {
          this.patients = response;
          return response;
        })
      );
    }
    getPatientForSearch(){
      return this.http.get<IPatientForSearch[]>(this.baseUrl + 'patient/patientsearch').pipe(
        map(response => {
          this.patientForSearch = response;
          return response;
        })
      );
    }
    getPatientWithVitalById(id: number) {
      return this.http.get<IPatientWithVital>(this.baseUrl + 'Patient/patientWithVital/' + id).pipe(
        map(response => {
          this.patient = response;
          return response;
        })
      );
    }
    getPatienthistory(id: number) {
      return this.http.get<IPatientHistory>(this.baseUrl + '​​patient​/patienthistory​/' + id).pipe(
        map(response => {
          this.patientHistory = response;
          return response;
        })
      );
    }
    getPatienthistoryById(id: number) {
      return this.http.get<IPatientHistory>(this.baseUrl + 'Patient/patienthistory/' + id).pipe(
        map(response => {
          this.patientHistory = response;
          return response;
        })
      );
    }

    addPatient(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'patient', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
    updatePatient(values: any){
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.put<any>(this.baseUrl + 'patient', values, {headers}).pipe(
        map((response: any) => {
          console.log(response.message);
        })
      );
    }

    addPatientVital(values: any) {
      const token = localStorage.getItem('hotpital_user_token');
      let headers = new HttpHeaders();
      headers = headers.set('Authorization', `Bearer ${token}`);
      return this.http.post(this.baseUrl + 'Patient/addPatientVital', values,  {headers}).pipe(
        map((response: any) => {
          if (response) {
            console.log(response.message);
          }
        })
      );
    }
}
