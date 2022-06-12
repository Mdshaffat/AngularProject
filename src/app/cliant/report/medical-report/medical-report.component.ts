import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPatientForSearch } from 'src/app/core/models/Patient/patientForSearch';
import { IMedicalReport } from 'src/app/core/models/Report/madicalReport';
import Swal from 'sweetalert2';
import { PatientService } from '../../patient/patient.service';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-medical-report',
  templateUrl: './medical-report.component.html',
  styleUrls: ['./medical-report.component.css']
})
export class MedicalReportComponent implements OnInit {
  patientid: number;
  patientName: string;
  patients: IPatientForSearch[] = [];
  patientsearch = new FormControl();
  filteredPatient: Observable<IPatientForSearch[]>;
  medicalReport: IMedicalReport;
  wscols = [
    {wch: 20},
    {wch: 60},
    {wch: 60},
    {wch: 60},
    {wch: 20}
  ];

  constructor(private reportService: ReportService,
              private fb: FormBuilder,
              private patientService: PatientService) {
                this.filteredPatient = this.patientsearch.valueChanges
                .pipe(
                  startWith(''),
                  map(p => p ? this._filterPatient(p) : this.patients.slice())
                      );
               }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.patientid){
      this.reportService.getMedicalReport(this.patientid).subscribe(response => {
        this.medicalReport = response;
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Select A Patient',
      });
    }
  }
  loadPatient(search: string){
    this.patientService.getPatientForSearch(search).subscribe(response => {
      this.patients = response;
    });
  }
  exportexcel(): void
  {
    const fileName = `MedicalReport.xlsx`;
    const element = document.getElementById('print-section');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element, {raw: true});
    ws['!cols'] = this.wscols;
     /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
    XLSX.writeFile(wb, fileName);
  }
  onSelectPatient(patient: IPatient){
    this.patientid = patient.id;
    this.patientName = patient.firstName;
    this.patientsearch.patchValue(patient.firstName);
    }
  private _filterPatient(value: string): IPatientForSearch[] {
    const filterValue = value.toLowerCase();
    this.loadPatient(filterValue);
    return this.patients;
  }
}
