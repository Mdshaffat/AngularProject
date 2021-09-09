import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatientHistory } from 'src/app/core/models/Patient/patientHistory';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-history',
  templateUrl: './patient-history.component.html',
  styleUrls: ['./patient-history.component.css']
})
export class PatientHistoryComponent implements OnInit {
  panelOpenState = false;
  patientHistory: IPatientHistory;
  message: any;
  statusCode: any;
  id: any;

  constructor(private patientService: PatientService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.activateRoute.snapshot.paramMap.get('id')){
      this.id =  this.activateRoute.snapshot.paramMap.get('id');
      this.getPatientHistory(this.id);
    }
  }
  getPatientHistory(id: number){
    this.patientService.getPatienthistoryById(id).subscribe(response => {
      this.patientHistory = response;
      console.log(response);
    }, error => {
      this.message = error.message;
      console.log(error);
      location.reload();
    });
  }
}
