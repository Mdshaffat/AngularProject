import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IRole } from 'src/app/core/models/role';
import { PasswordValidator } from 'src/app/core/validators/form.validator';
import { HospitalService } from '../../hospital/hospital.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})

export class UserAddComponent implements OnInit {
  hide = true;
  roles: IRole[] = [];
  hospitals: IHospital[] = [];
  userAddForm: FormGroup = new FormGroup({});

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private accountService: AccountService,
              private router: Router,
              private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.createUserAddForm();
    this.getRole();
    this.getHospital();
  }

  createUserAddForm(){
    this.userAddForm = this.fb.group({
      hospitalId: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.maxLength(40)]],
      email: ['', [ Validators.required, Validators.email], [this.validateEmailNotTaken()]],
      designation: ['', [Validators.maxLength(40)]],
      bmdcRegNo: [, [ Validators.maxLength(15)]],
      optionalEmail: [, Validators.email],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      joiningDate: ['', Validators.required ],
      isActive: [true, Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
  }, {validators: PasswordValidator});
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map(res => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
  get f(){
    return this.userAddForm.controls;
  }
  onSubmit() {
    this.accountService.register(this.userAddForm.value).subscribe(response => {
      this.toastr.success( 'Added a new User' , 'Success' );
      this.router.navigateByUrl('/admin/user/userlist').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Check input value again');
      if (error.error.ConfirmPassword){this.toastr.error(error.errors.ConfirmPassword[0], 'Error'); }
      else
      {this.toastr.error(error.error.title, 'Error'); }
    });
  }
  getRole(){
    this.accountService.getAllRole().subscribe(response => {
      this.roles = response;
    }, error => {
      console.log(error);
    });
  }

  getHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    }, error => {
      console.log(error);
    });
  }
}
