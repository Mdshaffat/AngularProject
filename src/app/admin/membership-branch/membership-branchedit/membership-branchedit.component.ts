import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpazilaAndDistrictService } from 'src/app/cliant/patient/upazila-and-district.service';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IUpdateBranch } from 'src/app/core/models/MembershipBranch/updateBranch';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchedit',
  templateUrl: './membership-branchedit.component.html',
  styleUrls: ['./membership-branchedit.component.css']
})
export class MembershipBrancheditComponent implements OnInit , AfterViewInit {
  title = 'Update Branch';
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  updateBranchForm: FormGroup = new FormGroup({});
  updateBranch: IUpdateBranch;
  branch: IBranch;
  id: any;
  constructor(private toastr: ToastrService,
              private branchService: MembershipBranchService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadDivision();
    this.loadBranch();
    this.createUpdateBranchForm();
    this.populateHospitalFrom();
  }
  ngAfterViewInit(){
    this.populateHospitalFrom();
  }
  createUpdateBranchForm(){
    this.updateBranchForm = this.fb.group({
      id: [this.id],
      branchCode: [ , [Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      divisionId: [],
      upazilaId: [],
      districtId: [],
      isActive: [true, Validators.required],
    });
  }
  get f(){
    return this.updateBranchForm.controls;
  }
  loadBranch(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.branchService.getBranchById(this.id).subscribe(response => {
      console.log(response);
      this.branch = response;
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
  populateHospitalFrom(){
    this.updateBranchForm.patchValue({
      name: this.branch.name,
      branchCode: this.branch.branchCode,
      address: this.branch.address,
      divisionId: this.branch.divisionId,
      districtId: this.branch.districtId,
      upazilaId: this.branch.upazilaId,
      isActive: this.branch.isActive,
    });
  }

  onSubmit(){
    this.branchService.updateBranch(this.updateBranchForm.value).subscribe(response => {
      this.toastr.success('Branch Updated');
      console.log(response);
      this.router.navigateByUrl('/admin/membershipbranch/branches').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
}
