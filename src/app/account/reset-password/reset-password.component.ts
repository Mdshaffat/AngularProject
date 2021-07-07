import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordValidator } from 'src/app/core/validators/form.validator';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  resetpasswordform: FormGroup = new FormGroup({});

  public resetToken!: string;
  public resetEmail!: string;
  public showSuccess!: boolean;
  public showError!: boolean;
  public errorMessage!: string;

  constructor(private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private accountService: AccountService,
              private router: Router,
              private tostr: ToastrService) {
  }

  ngOnInit(): void {
    this.createResetPasswordForm();
    this.paramsPassingByUrl();
  }

  createResetPasswordForm(){
    this.resetpasswordform = this.fb.group({
      email: ['', Validators.email],
      token: [],
      password: ['', [Validators.required,
                    Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
    }, {validators: PasswordValidator} );
  }

  paramsPassingByUrl(){
    this.resetToken = this.activatedRoute.snapshot.queryParams['token'];
    this.resetEmail = this.activatedRoute.snapshot.queryParams['email'];
    this.resetpasswordform.patchValue({
        token: this.resetToken,
        email: this.resetEmail
      });
  }

  get f(){
    return this.resetpasswordform.controls;
  }

  onSubmit(){
    this.accountService.resetPassword(this.resetpasswordform.value).subscribe(response => {
      console.log(response);
      this.tostr.success('Password Reset');
      this.router.navigateByUrl('/');
    }, error =>
    {
      this.tostr.error(error);
      console.log(error);
    });
  }
}
