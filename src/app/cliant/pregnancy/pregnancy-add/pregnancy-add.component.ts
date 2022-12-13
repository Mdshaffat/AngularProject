import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { PregnancyService } from '../pregnancy.service';

@Component({
  selector: 'app-pregnancy-add',
  templateUrl: './pregnancy-add.component.html',
  styleUrls: ['./pregnancy-add.component.css']
})
export class PregnancyAddComponent implements OnInit {

  title = 'Add Mother';
  hospitals: IHospitalSortByName[] = [];
  hospitalId: number;
  pregnancyAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private pregnancyService: PregnancyService,
              private hospitalService: HospitalService,
              private accountService: AccountService,
              private location: Location
              ) { }

  ngOnInit(): void {
    this. getCurrectUserHospitalId();
    this.getHospital();
    this.createPregnancyAddForm();
  }
  // "patientId": 0,
  // "firstDateOfLastPeriod": "2022-06-07T11:10:19.063Z",
  // "expectedDateOfDelivery": "2022-06-07T11:10:19.063Z",
  // "hospitalId": 0
  createPregnancyAddForm(){
    this.pregnancyAddForm = this.fb.group({
      patientId: ['', [Validators.required, Validators.maxLength(40)]],
      firstDateOfLastPeriod: ['', [Validators.required, Validators.maxLength(50)]],
      expectedDateOfDelivery: ['', [Validators.required, Validators.maxLength(150)]],
      hospitalId: ['', [Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
      nextCheckup: ['', [Validators.maxLength(8)]],
    });
  }

  get f(){
    return this.pregnancyAddForm.controls;
  }

  onSubmit(){
    this.pregnancyService.addPregnancy(this.pregnancyAddForm.value).subscribe(response => {
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/pregnancy').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }


  // hospital

  getHospital(){
    this.hospitalService.getAllHospitalSortByName().subscribe(response => {
      this.hospitals = response;
    }, error => {
      console.log(error);
    });
  }

getCurrectUserHospitalId(){
   const hospitalid =  this.accountService.getDecoadedHospitalIdFromToken();
   if (hospitalid){
        this.hospitalId = +hospitalid;
      }
  }

  goBack() {
    this.location.back();
  }
}
