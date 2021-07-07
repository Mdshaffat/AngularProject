import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetpasswordform: FormGroup = new FormGroup ({});

  constructor(private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.createForgetPasswordForm();
  }

  createForgetPasswordForm(){
    this.forgetpasswordform = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

onSubmit(){
  const formvalues = this.forgetpasswordform.value;
  this.accountService.sendForgotPasswordEmail(formvalues.email).subscribe(
    (result: any) => {
      if (result) {
        this.toastr.success('Please check your Email');
        console.log(result.message);
        this.router.navigateByUrl('/');

      }
    },
    (error) => {
      if (error){
      console.log(error);
      this.toastr.success('Please check your Email');
      this.router.navigateByUrl('/');
      }
  }
  );
}
get f(){
  return this.forgetpasswordform.controls;
}

}
