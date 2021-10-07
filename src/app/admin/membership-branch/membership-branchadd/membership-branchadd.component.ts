import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchadd',
  templateUrl: './membership-branchadd.component.html',
  styleUrls: ['./membership-branchadd.component.css']
})
export class MembershipBranchaddComponent implements OnInit {
  branchAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private branchService: MembershipBranchService) { }

  ngOnInit(): void {
    this.createBranchAddForm();
  }

  createBranchAddForm(){
    this.branchAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: ['', [Validators.required, Validators.maxLength(200)]],
      upazila: ['', [Validators.required, Validators.maxLength(25)]],
      district: ['', [Validators.required, Validators.maxLength(25)]],
      isActive: [true, Validators.required]
    });
  }

  get f(){
    return this.branchAddForm.controls;
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
