import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpazilaAndDistrictService } from 'src/app/cliant/patient/upazila-and-district.service';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchadd',
  templateUrl: './membership-branchadd.component.html',
  styleUrls: ['./membership-branchadd.component.css']
})
export class MembershipBranchaddComponent implements OnInit {
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  branchAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private branchService: MembershipBranchService) { }

  ngOnInit(): void {
    this.loadDivision();
    this.createBranchAddForm();
  }

  createBranchAddForm(){
    this.branchAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      divisionId: [],
      upazilaId: [],
      districtId: [],
      isActive: [true, Validators.required]
    });
  }

  get f(){
    return this.branchAddForm.controls;
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
    this.branchService.addBranch(this.branchAddForm.value).subscribe(response => {
      this.toastr.success( 'Added a new Membership Branch' , 'Success' );
      this.router.navigateByUrl('/admin/membershipbranch/branches').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }

}
