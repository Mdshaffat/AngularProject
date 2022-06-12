import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IRole } from 'src/app/core/models/role';
import { IUser } from 'src/app/core/models/user';
import { HospitalService } from '../../hospital/hospital.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit , AfterViewInit {
  title = 'Update User';
  updateUserForm: FormGroup = new FormGroup({});
  hospitals: IHospitalSortByName[] = [];
  roles: IRole[] = [];
  updateUser!: IUser ;
  id: any;
  hide = true;
  constructor(private toastr: ToastrService,
              private userService: UserService,
              private hospitalService: HospitalService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private accountService: AccountService) { }

  ngOnInit(): void {
    this.loaduser();
    this.createUpdateFrom();
    this.getHospital();
    this.getRole();
    this.populateFrom();
  }
  ngAfterViewInit(){
      this.populateFrom();
  }
  createUpdateFrom(){
    this.updateUserForm = this.fb.group({
      userId: [this.id],
      hospitalId: [],
      firstName: ['', [Validators.required, Validators.maxLength(40)]],
      lastName: ['', [Validators.maxLength(40)]],
      email: ['', [Validators.required, Validators.email]],
      designation: ['', [ Validators.maxLength(15)]],
      bmdcRegNo: [ ,  [ Validators.maxLength(15)]],
      optionalEmail: [, Validators.email],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11), Validators.pattern('^[0-9]*$')]],
      isActive: [true, Validators.required],
      role: []
  });
  }

  loaduser(){
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(response => {
      console.log(response);
      this.updateUser = response;
    }, error => {
      console.log(error);
    });
  }
  get f(){
    return this.updateUserForm.controls;
  }
  onSubmit(){
  this.userService.updateUser(this.updateUserForm.value).subscribe(response => {
    this.toastr.success('User Updated');
    console.log(response);
    this.router.navigateByUrl('/admin/user/userlist').then(() => {location.reload(); } );
  },
  error => {
    console.log(error);
  }
  );
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
  populateFrom(){
      this.updateUserForm.patchValue({
        hospitalId: this.updateUser.hospitalId,
        firstName: this.updateUser.firstName,
        lastName: this.updateUser.lastName,
        email: this.updateUser.email,
        designation: this.updateUser.designation,
        bmdcRegNo: this.updateUser.bmdcRegNo,
        optionalEmail: this.updateUser.optionalEmail,
        phoneNumber: this.updateUser.phoneNumber,
        isActive: this.updateUser.isActive,
        role: this.updateUser.role
      });
  }
  getHospital(){
    this.hospitalService.getAllHospitalSortByName().subscribe(response => {
      this.hospitals = response;
    }, error => {
      console.log(error);
    });
  }
  getRole(){
    this.accountService.getAllRole().subscribe(response => {
      this.roles = response;
    }, error => {
      console.log(error);
    });
  }
}
