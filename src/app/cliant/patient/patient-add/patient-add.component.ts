import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { MembershipBranchService } from 'src/app/admin/membership-branch/membership-branch.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IHeightFeet, IHeightInch } from 'src/app/core/models/Patient/patientHeightandWeight';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { PatientService } from '../patient.service';
import { UpazilaAndDistrictService } from '../upazila-and-district.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {

  patientAddForm: FormGroup = new FormGroup({});
  hospitals: IHospital[];
  branches: IBranch[];
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  heightFeet: IHeightFeet[] = [
    {feet: 1},
    {feet: 2},
    {feet: 3},
    {feet: 4},
    {feet: 5},
    {feet: 6},
    {feet: 7},
    {feet: 8}

  ];
  heightInch: IHeightInch[] = [
    {inch: 1},
    {inch: 2},
    {inch: 3},
    {inch: 4},
    {inch: 5},
    {inch: 6},
    {inch: 7},
    {inch: 8},
    {inch: 9},
    {inch: 10},
    {inch: 11}
  ];
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private hospitalService: HospitalService,
              private branchService: MembershipBranchService,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private patientService: PatientService) { }
  get f(){
    return this.patientAddForm.controls;
  }
  ngOnInit(): void {
    this.loadHospital();
    this.loadBranch();
    this.loadDivision();
    // this.loadDistrict();
    this.createPatientAddForm();
  }

  createPatientAddForm(){
    this.patientAddForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      mobileNumber: [, [Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      doB: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: [],
      primaryMember: [true],
      address: [],
      divisionId: [],
      districtId: [],
      upazilaId: [],
      nid: [''],
      bloodGroup: [''],
      branchId: ['', Validators.required],
      isActive: [true],
      note: [''],
      heightFeet: [],
      heightInches: [],
      weight: [''],
      bmi: [''],
      bodyTemparature: [''],
      bloodPressureSystolic: [],
      bloodPressureDiastolic: [],
      spO2: [''],
      pulseRate: ['']
    });
  }
  loadHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadDivision(){
    this.upazilaAndDistrictService.getAllDivision().subscribe(response => {
      this.divisions = response;
    });
  }
  loadDistrictBySelectDivision(id: number){
    this.upazilaAndDistrictService.getAllDistrictByDivisionId(id).subscribe(response => {
      this.districts = response;
    });
  }
  // loadDistrict(){
  //   this.upazilaAndDistrictService.getAllDistrict().subscribe(response => {
  //     this.districts = response;
  //   });
  // }
  loadUpazilaBySelectDistrict(id: number){
    this.upazilaAndDistrictService.getAllUpazilaByDistrictId(id).subscribe(response => {
      this.upazilas = response;
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
