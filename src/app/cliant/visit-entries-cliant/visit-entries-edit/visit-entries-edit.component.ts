import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesAddComponent } from '../visit-entries-add/visit-entries-add.component';


@Component({
  selector: 'app-visit-entries-edit',
  templateUrl: './visit-entries-edit.component.html',
  styleUrls: ['./visit-entries-edit.component.css']
})
export class VisitEntriesEditComponent implements OnInit, AfterViewInit {

  patients: IPatient [];
  visitEntries: IVisitEntry [];
  visitEntry: any;
  hospitals: IHospital [];
  visitEntryUpdateForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<VisitEntriesAddComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IVisitEntry) {
                console.log(data);
                this.visitEntry = {...data};
              }

  ngOnInit(): void {
    this.loadAllHospital();
    this.loadAllPatient();
    this.updateVisitEntryEditForm();
    this. populateHospitalFrom();
  }
  ngAfterViewInit(): void {
    this. populateHospitalFrom();
  }

  updateVisitEntryEditForm(){
    this.visitEntryUpdateForm = this.fb.group({
      id: [this.visitEntry.id],
      date: ['', Validators.required],
      patientId: ['', Validators.required],
      serial: ['', Validators.required],
      status: ['', Validators.required]
    });
  }
  populateHospitalFrom(){
    this.visitEntryUpdateForm.patchValue({
      hospitalId: this.visitEntry.hospitalId,
      date: this.visitEntry.date,
      patientId: this.visitEntry.patientId,
      serial: this.visitEntry.serial,
      status: this.visitEntry.status
    });
  }
  get f(){
    return this.visitEntryUpdateForm.controls;
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
    this.dialogRef.close({data: this.visitEntryUpdateForm.value});
  }

  closeDialog(){
    this.dialogRef.close();
  }
}

