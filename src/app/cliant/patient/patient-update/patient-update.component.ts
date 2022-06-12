import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { MembershipBranchService } from 'src/app/admin/membership-branch/membership-branch.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IPatientWithVital } from 'src/app/core/models/Patient/getPatientWithVital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IUpdatePatient } from 'src/app/core/models/Patient/updatePatient';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { PatientService } from '../patient.service';
import { UpazilaAndDistrictService } from '../upazila-and-district.service';
import { Location } from '@angular/common';
enum genders {
  Male,
  Female,
  Others
}

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})

export class PatientUpdateComponent implements OnInit , AfterViewInit {
  genders = genders;
  updatePatientForm: FormGroup = new FormGroup({});
  updatePatient: IUpdatePatient;
  patient: IPatientWithVital;
  hospitals: IHospital[];
  branches: IBranch[];
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  title = 'Update Patient';
  id: any;
  constructor(private toastr: ToastrService,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              private branchService: MembershipBranchService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private fb: FormBuilder,
              private location: Location
              ) {}

  ngOnInit(): void {
    this.loadPatient();
    this.loadHospital();
    this.loadBranch();
    this.loadDivision();
    // this. loadDistrict();
    this.createUpdatePatientForm();
  }
  ngAfterViewInit(){
    this.populatePatientFrom();
  }
  createUpdatePatientForm(){
    this.updatePatientForm = this.fb.group({
      id: [this.id],
      hospitalId: ['', Validators.required],
      branchId: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', Validators.maxLength(40)],
      address: [, Validators.maxLength(200)],
      divisionId: [, Validators.required],
      districtId: [,  Validators.required],
      upazilaId: [,  Validators.required],
      mobileNumber: [, [Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      doB: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: [],
      primaryMember: [true],
      membershipRegistrationNumber:[ ,Validators.maxLength(20)],
      nid: ['', [Validators.maxLength(25), Validators.pattern('^[0-9]*$')]],
      bloodGroup: [''],
      isActive: [true],
      covidvaccine: [, Validators.maxLength(5)],
      vaccineBrand: [, Validators.maxLength(15)],
      vaccineDose: [, Validators.maxLength(15)],
      firstDoseDate: [],
      secondDoseDate: [],
      bosterDoseDate: [],
      note: ['', Validators.maxLength(300)],
    });
  }
  get f(){
    return this.updatePatientForm.controls;
  }
  loadPatient(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.patientService.getPatientWithVitalById(this.id).subscribe(response => {
      console.log(response);
      this.patient = response;
    }, error => {
      console.log(error);
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
  setHospitalAndBranch(hospital: IHospitalSortByName){
    this.updatePatientForm.controls.hospitalId.patchValue(hospital.id);
    this.updatePatientForm.controls.branchId.patchValue(hospital.branchId);
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
  populatePatientFrom(){
    this.updatePatientForm.patchValue({
      hospitalId: this.patient.hospitalId,
      firstName: this.patient.firstName,
      lastName: this.patient.lastName,
      address: this.patient.address,
      divisionId: this.patient.divisionId,
      districtId: this.patient.districtId,
      upazilaId: this.patient.upazilaId,
      age: this.patient.age,
      mobileNumber: this.patient.mobileNumber,
      doB: this.patient.doB,
      gender: this.patient.gender,
      maritalStatus: this.patient.maritalStatus,
      nid: this.patient.nid,
      bloodGroup: this.patient.bloodGroup,
      branchId: this.patient.branchId,
      isActive: this.patient.isActive,
      primaryMember: this.patient.primaryMember,
      membershipRegistrationNumber: this.patient.membershipRegistrationNumber,
      covidvaccine: this.patient.covidvaccine,
      vaccineBrand: this.patient.vaccineBrand,
      vaccineDose: this.patient.vaccineDose,
      firstDoseDate: this.patient.firstDoseDate,
      secondDoseDate: this.patient.secondDoseDate,
      bosterDoseDate: this.patient.bosterDoseDate,
      note: this.patient.note
    });
  }

  onSubmit(){
    this.patientService.updatePatient(this.updatePatientForm.value).subscribe(response => {
      this.toastr.success('Hospital Updated');
      console.log(response);
      this.router.navigateByUrl('/patient/list').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
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
  goBack(){
    this.location.back();
  }

}
