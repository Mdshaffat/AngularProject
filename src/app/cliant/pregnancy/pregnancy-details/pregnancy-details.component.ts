import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IPrenantProfile } from 'src/app/core/models/pregnancyModel/pregnatProfile';
import { CheckupComponent } from '../checkup/checkup.component';
import { PregnancyService } from '../pregnancy.service';

@Component({
  selector: 'app-pregnancy-details',
  templateUrl: './pregnancy-details.component.html',
  styleUrls: ['./pregnancy-details.component.css']
})
export class PregnancyDetailsComponent implements OnInit {
  title = 'Profile';
  pregnantProfile: IPrenantProfile;
  id: any;
  isAdd = false;
  checkupAddForm: FormGroup = new FormGroup({});

  constructor(private activateRoute: ActivatedRoute,
              private pregnancyServic: PregnancyService,
              private location: Location,
              private fb: FormBuilder,
              public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProfile();
  }
  createPregnancyCheckupAddForm(){
    this.checkupAddForm = this.fb.group({
      pregnancyId: ['', [Validators.required, Validators.maxLength(40)]],
      checkupDate: ['', [Validators.required, Validators.maxLength(50)]],
      nextCheckup: ['', [Validators.required, Validators.maxLength(150)]],
      prescriptionId: ['', [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
    });
  }
  loadProfile(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.pregnancyServic.getPregnantProfileById(this.id).subscribe(response => {
      console.log(response);
      this.pregnantProfile = response;
    }, error => {
      console.log(error);
    });
  }

  openCheckupDialog() {
    const dialogBoxWithData = this.dialog.open(CheckupComponent, {
      width: '80%',
      data: this.id
    });
    dialogBoxWithData.afterClosed().subscribe(result => {
      this.pregnancyServic.addCheckup(result.data).subscribe(res => {
        console.log(res);
      });
        // this.patientVitalAddRowData(result.data);
    });
  }
  onSubmit() {
    return;
  }
  goBack(){
    this.location.back();
  }
  toggleIsAdd() {
    this.isAdd = !this.isAdd;
  }

}
