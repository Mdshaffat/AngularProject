import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IDiseasesCategory } from 'src/app/core/models/Diagnosis/diseasesCategory';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IDiseasesCategoryReport } from 'src/app/core/models/Report/diseasesCategoryReport';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';
export interface IMonths{
  name: string;
  value: number;
}
@Component({
  selector: 'app-report-by-diseases-category',
  templateUrl: './report-by-diseases-category.component.html',
  styleUrls: ['./report-by-diseases-category.component.css']
})
export class ReportByDiseasesCategoryComponent implements OnInit {

  months: IMonths[] = [
    {
      name: 'January',
      value: 1
    },
    {
      name: 'February',
      value: 2
    },
    {
      name: 'March',
      value: 3
    },
    {
      name: 'April',
      value: 4
    },
    {
      name: 'May',
      value: 5
    },
    {
      name: 'June',
      value: 6
    },
    {
      name: 'July',
      value: 7
    },
    {
      name: 'August',
      value: 8
    },
    {
      name: 'September',
      value: 9
    },
    {
      name: 'October',
      value: 10
    },
    {
      name: 'November',
      value: 11
    },
    {
      name: 'December',
      value: 12
    },
  ];
  currentDate =  new Date();
  month = 1;
  year = 2022;
  hospitalId = 0;
  diseasesCategoryForm: FormGroup = new FormGroup({});
  diseasesCategoryReport: IDiseasesCategoryReport;
  hospitals: IHospital[] = [];
  constructor(private hospitalService: HospitalService,
              private fb: FormBuilder,
              private reportService: ReportService
               ) { }

  ngOnInit(): void {
    this.loadHospital();
    this.intDiseasesCategoryForm();
  }

  intDiseasesCategoryForm(){
    this.diseasesCategoryForm = this.fb.group({
      month: [],
      year: [],
      hospitalId: []
    });
  }
  loadHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  exportexcel(): void
  {
    const fileName = `DiagnosisReport-${this.diseasesCategoryReport.hospitalName}- ${this.diseasesCategoryReport.monthName}- ${this.diseasesCategoryReport.year}.xlsx`;
    const element = document.getElementById('print-section');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
     /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
    XLSX.writeFile(wb, fileName);
  }
  onSubmit(){
    this.reportService.getDiseasesReport(this.month, this.year, this.hospitalId).subscribe(response => {
      this.diseasesCategoryReport = response;
    });
  }
}
