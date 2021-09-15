import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesAddComponent } from '../visit-entries-add/visit-entries-add.component';
@Component({
  selector: 'app-visit-entries-status-update',
  templateUrl: './visit-entries-status-update.component.html',
  styleUrls: ['./visit-entries-status-update.component.css']
})
export class VisitEntriesStatusUpdateComponent implements OnInit, AfterViewInit {

  patients: IPatient [];
  visitEntry: any;
  visitEntryStatusUpdateForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<VisitEntriesAddComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: IVisitEntry) {
                console.log(data);
                this.visitEntry = {...data};
              }

  ngOnInit(): void {
    this.updateVisitEntryEditForm();
    this. populateHospitalFrom();
  }
  ngAfterViewInit(): void {
    this. populateHospitalFrom();
  }

  updateVisitEntryEditForm(){
    this.visitEntryStatusUpdateForm = this.fb.group({
      id: [this.visitEntry.id],
      status: ['', Validators.required]
    });
  }
  populateHospitalFrom(){
    this.visitEntryStatusUpdateForm.patchValue({
      status: this.visitEntry.status
    });
  }
  get f(){
    return this.visitEntryStatusUpdateForm.controls;
  }

  doAction(){
    this.dialogRef.close({data: this.visitEntryStatusUpdateForm.value});
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
