import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientService } from 'src/app/cliant/patient/patient.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { HospitalService } from '../../hospital/hospital.service';
import { VistEntryAddComponent } from '../vist-entry-add/vist-entry-add.component';

@Component({
  selector: 'app-vist-entry-status-update',
  templateUrl: './vist-entry-status-update.component.html',
  styleUrls: ['./vist-entry-status-update.component.css']
})
export class VistEntryStatusUpdateComponent implements OnInit, AfterViewInit {

  patients: IPatient [];
  visitEntry: any;
  visitEntryStatusUpdateForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              public dialogRef: MatDialogRef<VistEntryAddComponent>,
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
