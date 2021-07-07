import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
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
  updateUserForm: FormGroup = new FormGroup({});
  hospitals: IHospital[] = [];
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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      designation: [''],
      phoneNumber: [''],
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
        phoneNumber: this.updateUser.phoneNumber,
        isActive: this.updateUser.isActive,
        role: this.updateUser.role
      });
  }
  getHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
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
