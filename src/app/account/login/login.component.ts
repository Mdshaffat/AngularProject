import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrontDialogComponent } from 'src/app/Shared/component/front-dialog/front-dialog.component';
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
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog
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

  openFAQDialog() {
    this.dialog.open(FrontDialogComponent, {
      data: {
        title: 'Frequently Asked Questions:',
        details: `
                    1. How can I get user id and password? 
                    2. Where should I contact for technical support?
                    3. Why I can not save the prescription data?
                    4. How to find out patient’s details?
                    5. How to find out prescription details?
                    6. How to download reports?
        `
      },
    });
  }
  openSubInfoDialog() {
    this.dialog.open(FrontDialogComponent, {
      data: {
        title: ' ',
        details: `Please contact, info@outreachforall.org
        for collaboration/subscription details.
        `
      },
    });
  }
  openHelpDeskDialog() {
    this.dialog.open(FrontDialogComponent, {
      data: {
        title: ' ',
        details: `
        For technical support: dotplusfeedback@gmail.com
        `
      },
    });
  }
}
