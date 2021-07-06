import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup = new FormGroup ({});
  returnUrl: string;
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private activatedRoute: ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(){
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.toastr.success('Logged in ');
      this.router.navigateByUrl(this.returnUrl);
    }, error =>
    {
      this.toastr.error('Contact with Admin', error.error.title);
      console.log(error);
    });
  }
}
