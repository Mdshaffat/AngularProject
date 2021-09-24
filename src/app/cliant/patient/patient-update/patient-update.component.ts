import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { MembershipBranchService } from 'src/app/admin/membership-branch/membership-branch.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IUpdatePatient } from 'src/app/core/models/Patient/updatePatient';
import { PatientService } from '../patient.service';
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
  patient: IPatient;
  hospitals: IHospital[];
  branches: IBranch[];
  id: any;
  constructor(private toastr: ToastrService,
              private hospitalService: HospitalService,
              private patientService: PatientService,
              private branchService: MembershipBranchService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              ) {}

  ngOnInit(): void {
    this.loadPatient();
    this.loadHospital();
    this.loadBranch();
    this.createUpdatePatientForm();
  }
  ngAfterViewInit(){
    this.populatePatientFrom();
  }
  createUpdatePatientForm(){
    this.updatePatientForm = this.fb.group({
      id: [this.id],
      firstName: ['', Validators.required],
      lastName: [''],
      address: [''],
      mobileNumber: [''],
      doB: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      primaryMember: [true],
      nid: [true],
      bloodGroup: [''],
      branchId: ['', Validators.required],
      isActive: [true],
      note: ['']
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
  populatePatientFrom(){
    this.updatePatientForm.patchValue({
      hospitalId: this.patient.hospitalId,
      firstName: this.patient.firstName,
      lastName: this.patient.lastName,
      address: this.patient.address,
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
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });

  }
  loadBranch(){
    this.branchService.getAllBranches().subscribe(response => {
      this.branches = response;
    });
  }

}
