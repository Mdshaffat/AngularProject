import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PregnancyDetailsComponent } from '../pregnancy-details/pregnancy-details.component';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.css']
})
export class CheckupComponent implements OnInit {
  checkupAddForm: FormGroup = new FormGroup({});
  pregnencyId: number;
  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<PregnancyDetailsComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.pregnencyId = data;
  }
  ngOnInit(): void {
    this. createPregnancyCheckupAddForm();
    this.populateFrom();

  }
  createPregnancyCheckupAddForm(){
    this.checkupAddForm = this.fb.group({
      pregnancyId: ['', [Validators.required, Validators.maxLength(40)]],
      checkupDate: ['', [Validators.required]],
      prescriptionId: ['', [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      nextCheckup: ['', [Validators.required]],
    });
  }
  populateFrom(){
    this.checkupAddForm.patchValue({
      pregnancyId: this.pregnencyId
    });
  }
  doAction(){
    this.dialogRef.close({data: this.checkupAddForm.value});
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
