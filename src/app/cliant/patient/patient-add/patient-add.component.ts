import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { MembershipBranchService } from 'src/app/admin/membership-branch/membership-branch.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IBranchSortByName } from 'src/app/core/models/MembershipBranch/branchSortByName';
import { IHeightFeet, IHeightInch } from 'src/app/core/models/Patient/patientHeightandWeight';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import Swal from 'sweetalert2';
import { PatientService } from '../patient.service';
import { UpazilaAndDistrictService } from '../upazila-and-district.service';

@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.css']
})
export class PatientAddComponent implements OnInit {
  footerName = 'form';
  hospital: IHospitalSortByName;
  patientAddForm: FormGroup = new FormGroup({});
  hospitals: IHospitalSortByName[];
  branches: IBranchSortByName[];
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  title = 'Add Patient';
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
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
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
      hospitalId: [ , Validators.required],
      branchId: [],
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', Validators.maxLength(40)],
      mobileNumber: [, [Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      age: [ , [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      day: [ , [Validators.max(30), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      month: [ , [Validators.max(11), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      year: [ , [Validators.max(2021), Validators.pattern('^(0|[1-9][0-9]*)$')]],
      doB: [],
      gender: [, Validators.required],
      maritalStatus: [],
      tobacoHabit: ['1', Validators.required],
      primaryMember: [false],
      membershipRegistrationNumber: [ , Validators.maxLength(20)],
      address: [, Validators.maxLength(200)],
      divisionId: [],
      districtId: [],
      upazilaId: [],
      nid: ['', [Validators.maxLength(25), Validators.pattern('^[0-9]*$')]],
      bloodGroup: [''],
      isActive: [true],
      covidvaccine: [, [ Validators.required, Validators.maxLength(5)]],
      vaccineBrand: [, [ Validators.required, Validators.maxLength(15)]],
      vaccineDose: [, [ Validators.required, Validators.maxLength(15)]],
      firstDoseDate: [],
      secondDoseDate: [],
      bosterDoseDate: [],
      note: ['', Validators.maxLength(300)],
      weight: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]*$')]],
      heightFeet: [],
      heightInches: [],
      bmi: [''],
      appearance: [ , Validators.maxLength(10)],
      anemia: [ , Validators.maxLength(10)],
      jaundice: [ , Validators.maxLength(10)],
      dehydration: [ , Validators.maxLength(10)],
      edema: [ , Validators.maxLength(10)],
      cyanosis: [ , Validators.maxLength(10)],
      kub: [ , Validators.maxLength(10)],
      rbsFbs: [ , Validators.maxLength(20)],
      bodyTemparature: [, [Validators.maxLength(5), Validators.pattern(this.numRegex)]],
      bloodPressureSystolic: [, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      bloodPressureDiastolic: [, [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      spO2: ['', [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]],
      pulseRate: ['', [Validators.maxLength(4), Validators.pattern('^[0-9]*$')]]
    });
  }
  loadHospital(){
    this.hospitalService.getAllHospitalSortByName().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadBranch(){
    this.branchService.getAllBranchesSortByName().subscribe(response => {
      this.branches = response;
    });
  }
  setHospitalAndBranch(hospital: IHospitalSortByName){
    this.patientAddForm.controls.hospitalId.patchValue(hospital.id);
    this.patientAddForm.controls.branchId.patchValue(hospital.branchId);
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

  onSubmit(){
    if (this.patientAddForm.controls.hospitalId.value == null) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Select Hospital',
      });
    }else {
      if (this.patientAddForm.controls.gender.value == null) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Select Gender',
        });
      }else {
        if (this.patientAddForm.controls.doB.value === null &&
             (this.patientAddForm.controls.day.value === null &&
               this.patientAddForm.controls.month.value === null &&
                this.patientAddForm.controls.year.value === null)){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please input Date Of Birth or Age',
          });
        }else{
          if (this.patientAddForm.controls.doB.value > moment())
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Date Of birth should be less then or equal today',
            });
          } else {
            this.patientService.addPatient(this.patientAddForm.value).subscribe(response => {
              if ( response.message === 'exist'){
                this.toastr.success( 'Patient Exist' , 'Success' );
                this.router.navigateByUrl('/patient/list');
              }
              else{
                this.toastr.success( 'Added a new Patient' , 'Success' );
                this.router.navigateByUrl('/patient/list').then(() => {location.reload(); } );
              }
            }, error => {
              console.log(error);
              this.toastr.error('Error to Create.Please check your connection and try again');
            });
          }
        }
      }
    }
  }
  calculateAge(){
    const ThisYear = new Date().getFullYear();
    const inputYear = new Date(this.patientAddForm.value.doB).getFullYear();
    const age = ThisYear - inputYear;
    this.patientAddForm.controls.age.patchValue(age);

  }
}
