import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/cliant/patient/patient.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { HospitalService } from '../../hospital/hospital.service';
import { VisitEntryService } from '../visit-entry.service';

@Component({
  selector: 'app-vist-entry-add',
  templateUrl: './vist-entry-add.component.html',
  styleUrls: ['./vist-entry-add.component.css']
})
export class VistEntryAddComponent implements OnInit {
  patients: IPatient [];
  visitEntries: IVisitEntry [];
  hospitals: IHospital [];
  visitEntryAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private visitEntryService: VisitEntryService,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<VistEntryAddComponent>,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IVisitEntry) { }

  ngOnInit(): void {
    this.loadAllHospital();
    this.loadAllPatient();
    this.createVisitEntryAddForm();
  }

  createVisitEntryAddForm(){
    this.visitEntryAddForm = this.fb.group({
      hospitalId: ['', Validators.required],
      date: [new Date(), Validators.required],
      patientId: ['', Validators.required],
      serial: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  get f(){
    return this.visitEntryAddForm.controls;
  }
  loadAllPatient(){
    this.patientService.getAllPatient().subscribe(response => {
      this.patients = response;
    });
  }
  loadAllHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  doAction(){
    this.dialogRef.close({data: this.visitEntryAddForm.value});
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
