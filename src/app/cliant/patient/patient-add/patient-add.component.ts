import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { MembershipBranchService } from 'src/app/admin/membership-branch/membership-branch.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { PatientService } from '../patient.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  patientAddForm: FormGroup = new FormGroup({});
  hospitals: IHospital[];
  branches: IBranch[];
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private hospitalService: HospitalService,
              private branchService: MembershipBranchService,
              private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadHospital();
    this.loadBranch();
    this.createPatientAddForm();
  }

  createPatientAddForm(){
    this.patientAddForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      mobileNumber: [],
      doB: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: [],
      primaryMember: [true],
      address: [],
      nid: [''],
      bloodGroup: [''],
      branchId: ['', Validators.required],
      isActive: [true],
      note: [''],
      height: [''],
      weight: [''],
      bmi: [''],
      spO2: [''],
      pulseRate: ['']
    });
  }

  get f(){
    return this.patientAddForm.controls;
  }
  loadHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadBranch(){
    this.branchService.getAllBranches().subscribe(response => {
      this.branches = response;
    });
  }
  onSubmit(){
    this.patientService.addPatient(this.patientAddForm.value).subscribe(response => {
      this.toastr.success( 'Added a new Hospital' , 'Success' );
      this.router.navigateByUrl('/patient/list').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
}
