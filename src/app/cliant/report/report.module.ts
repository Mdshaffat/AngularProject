import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientCountByBranchAndDateComponent } from './patient-count-by-branch-and-date/patient-count-by-branch-and-date.component';
import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MaterialModule } from 'src/app/Shared/material/material.module';
import { PrescriptionCountByBranchAndDateComponent } from './prescription-count-by-branch-and-date/prescription-count-by-branch-and-date.component';
import { PendingFoollowupListComponent } from './pending-foollowup-list/pending-foollowup-list.component';
import { ReportByDiseasesCategoryComponent } from './report-by-diseases-category/report-by-diseases-category.component';
import { NgxPrintModule } from 'ngx-print';
import { MedicalReportComponent } from './medical-report/medical-report.component';
import { TelimedicineReportComponent } from './telimedicine-report/telimedicine-report.component';



@NgModule({
  declarations: [
    PatientCountByBranchAndDateComponent,
    PrescriptionCountByBranchAndDateComponent,
    PendingFoollowupListComponent,
    ReportByDiseasesCategoryComponent,
    MedicalReportComponent,
    TelimedicineReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    MaterialModule,
    NgxPrintModule
  ]
})
export class ReportModule { }
