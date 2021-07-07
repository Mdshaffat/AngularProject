import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IUpdateHospital } from 'src/app/core/models/Hospital/updateHospital';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit , AfterViewInit {
  updateHospitalForm: FormGroup = new FormGroup({});
  updatehospital: IUpdateHospital;
  hospital: IHospital;
  id: any;
  constructor(private toastr: ToastrService,
              private hospitalService: HospitalService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadHospital();
    this.createUpdateHospitalForm();
    this.populateHospitalFrom();
  }
  ngAfterViewInit(){
    this.populateHospitalFrom();
  }
  createUpdateHospitalForm(){
    this.updateHospitalForm = this.fb.group({
      id: [this.id],
      name: ['', Validators.required],
      address: ['', Validators.required],
      upazilla: ['', Validators.required],
      district: ['', Validators.required],
      isActive: [true, Validators.required],
    });
  }
  get f(){
    return this.updateHospitalForm.controls;
  }
  loadHospital(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.hospitalService.getHospitalById(this.id).subscribe(response => {
      console.log(response);
      this.hospital = response;
    }, error => {
      console.log(error);
    });
  }
  populateHospitalFrom(){
    this.updateHospitalForm.patchValue({
      name: this.hospital.name,
      address: this.hospital.address,
      upazilla: this.hospital.upazilla,
      district: this.hospital.district,
      isActive: this.hospital.isActive,
    });
  }

  onSubmit(){
    this.hospitalService.updateHospital(this.updateHospitalForm.value).subscribe(response => {
      this.toastr.success('Hospital Updated');
      console.log(response);
      this.router.navigateByUrl('/admin/hospital/hospitals').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
}
