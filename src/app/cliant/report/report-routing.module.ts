import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientCountByBranchAndDateComponent } from './patient-count-by-branch-and-date/patient-count-by-branch-and-date.component';
import { PrescriptionCountByBranchAndDateComponent } from './prescription-count-by-branch-and-date/prescription-count-by-branch-and-date.component';
import { PendingFoollowupListComponent } from './pending-foollowup-list/pending-foollowup-list.component';
import { ReportByDiseasesCategoryComponent } from './report-by-diseases-category/report-by-diseases-category.component';
import { MedicalReportComponent } from './medical-report/medical-report.component';
import { TelimedicineReportComponent } from './telimedicine-report/telimedicine-report.component';

const routes: Routes = [
  {path: '', redirectTo: 'countpatientbydate'},
  {path: 'countpatientbydate', component: PatientCountByBranchAndDateComponent},
  {path: 'countprescriptionbydate', component: PrescriptionCountByBranchAndDateComponent},
  {path: 'followup', component: PendingFoollowupListComponent},
  {path: 'diagnosismonthlyreport', component: ReportByDiseasesCategoryComponent},
  {path: 'medicalreport', component: MedicalReportComponent},
  {path: 'telimedicinereport', component: TelimedicineReportComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [

  ]
})
export class ReportRoutingModule { }
