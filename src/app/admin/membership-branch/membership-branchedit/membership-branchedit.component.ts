import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { IUpdateBranch } from 'src/app/core/models/MembershipBranch/updateBranch';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchedit',
  templateUrl: './membership-branchedit.component.html',
  styleUrls: ['./membership-branchedit.component.css']
})
export class MembershipBrancheditComponent implements OnInit , AfterViewInit {
  updateBranchForm: FormGroup = new FormGroup({});
  updateBranch: IUpdateBranch;
  branch: IBranch;
  id: any;
  constructor(private toastr: ToastrService,
              private branchService: MembershipBranchService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
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
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      upazila: ['', [Validators.required, Validators.maxLength(25)]],
      district: ['', [Validators.required, Validators.maxLength(25)]],
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
  populateHospitalFrom(){
    this.updateBranchForm.patchValue({
      name: this.branch.name,
      address: this.branch.address,
      upazila: this.branch.upazila,
      district: this.branch.district,
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
