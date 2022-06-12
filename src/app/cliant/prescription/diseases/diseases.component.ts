import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrescriptionEditComponent } from '../prescription-edit/prescription-edit.component';
export interface DialogData {
  diseasesCategoryId: number;
  name: string;
  diseasesCategoryName: string;
}
@Component({
  selector: 'app-diseases',
  templateUrl: './diseases.component.html',
  styleUrls: ['./diseases.component.css']
})
export class DiseasesComponent implements OnInit {
  disease: string;
  constructor(
    public dialogRef: MatDialogRef<PrescriptionEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
