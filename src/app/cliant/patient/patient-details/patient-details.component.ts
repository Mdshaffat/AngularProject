import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IPatientWithVital } from 'src/app/core/models/Patient/getPatientWithVital';
import { AddPatientVitalComponent } from '../add-patient-vital/add-patient-vital.component';
import { PatientService } from '../patient.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  patientDetails: IPatientWithVital;
  id: any;
  title = 'Patient Details';
  constructor(private activateRoute: ActivatedRoute,
              private patientService: PatientService,
              private toastr: ToastrService,
              private location: Location,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadPatient();
  }


  openDialog(obj) {
    const dialogBoxWithData = this.dialog.open(AddPatientVitalComponent, {
      width: '80%',
      data: obj
    });
    dialogBoxWithData.afterClosed().subscribe(result => {
        this.updateRowData(result.data);
    });
  }

  updateRowData(data: any){
      this.patientService.addPatientVital(data).subscribe(response => {
        this.toastr.success('Updated');
        location.reload();
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error('Error to Update. Please check your connection and try again');
      });
    }

  loadPatient(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.patientService.getPatientWithVitalById(this.id).subscribe(response => {
      console.log(response);
      this.patientDetails = response;
    }, error => {
      console.log(error);
    });
  }
  goBack(){
    this.location.back();
  }
}

