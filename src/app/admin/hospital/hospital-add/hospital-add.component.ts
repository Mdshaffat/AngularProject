import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-add',
  templateUrl: './hospital-add.component.html',
  styleUrls: ['./hospital-add.component.css']
})
export class HospitalAddComponent implements OnInit {
  hospitalAddForm: FormGroup = new FormGroup({});
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private hospitalService: HospitalService) { }

  ngOnInit(): void {
    this.createHospitalAddForm();
  }

  createHospitalAddForm(){
    this.hospitalAddForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      upazilla: ['', Validators.required],
      district: ['', Validators.required],
      isActive: [true, Validators.required]
    });
  }

  get f(){
    return this.hospitalAddForm.controls;
  }

  onSubmit(){
    this.hospitalService.addHospital(this.hospitalAddForm.value).subscribe(response => {
      this.toastr.success( 'Added a new Hospital' , 'Success' );
      this.router.navigateByUrl('/admin/hospital/hospitals').then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
}
