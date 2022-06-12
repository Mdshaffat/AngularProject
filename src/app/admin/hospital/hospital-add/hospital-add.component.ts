import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpazilaAndDistrictService } from 'src/app/cliant/patient/upazila-and-district.service';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { MembershipBranchService } from '../../membership-branch/membership-branch.service';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {
  title = 'Add Hospital';
  branches: IBranch[] = [];
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  hospitalAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private branchService: MembershipBranchService,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.loadBranch();
    this.loadDivision();
    this.createHospitalAddForm();
  }

  createHospitalAddForm(){
    this.hospitalAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      branchId: [],
      divisionId: [],
      upazilaId: [],
      districtId: [],
      isActive: [true, Validators.required]
    });
  }

  get f(){
    return this.hospitalAddForm.controls;
  }
  loadBranch(){
    this.branchService.getAllBranchesSortByName().subscribe(response => {
      this.branches = response;
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

  onSubmit(){
    this.hospitalService.addHospital(this.hospitalAddForm.value).subscribe(response => {
      this.toastr.success( 'Added a new Hospital' , 'Success' );
      this.router.navigateByUrl('/admin/hospital/hospitals').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
}
