import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatientVital } from 'src/app/core/models/Patient/addPatientVital';
import { IPatientWithVital } from 'src/app/core/models/Patient/getPatientWithVital';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-add-patient-vital',
  templateUrl: './add-patient-vital.component.html',
  styleUrls: ['./add-patient-vital.component.css']
})
export class AddPatientVitalComponent implements OnInit {
  footerName = 'form';
  patientDetails: IPatientWithVital;
  patientVitals: IPatientVital;
  patientVitalAddForm: FormGroup = new FormGroup({});
  action: string;
  patienVital: any;
  hospitals: IHospital[];



  constructor(private activateRoute: ActivatedRoute,
              private patientService: PatientService,
              private fb: FormBuilder,
              private hospitalService: HospitalService,
              public dialogRef: MatDialogRef<AddPatientVitalComponent>,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IPatientVital) {
                console.log(data);
                this.patienVital = {...data};
               }
  ngOnInit(): void {
    this.loadHospital();
    this.createPatientVitalForm();
  }

  createPatientVitalForm(){
    this.patientVitalAddForm = this.fb.group({
      patientId: [this.patienVital.patientId, Validators.required],
      hospitalId: [, Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bmi: ['', Validators.required],
      waist: ['', Validators.required],
      hip: ['', Validators.required],
      spO2: ['', Validators.required],
      pulseRate: ['', Validators.required]
  });
  }
  get f(){
    return this.patientVitalAddForm.controls;
  }
  loadHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }

  doAction(){
    console.log(this.patienVital.patientId);
    this.dialogRef.close({data: this.patientVitalAddForm.value});
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
