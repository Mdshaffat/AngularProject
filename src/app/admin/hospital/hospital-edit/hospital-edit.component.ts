import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpazilaAndDistrictService } from 'src/app/cliant/patient/upazila-and-district.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IUpdateHospital } from 'src/app/core/models/Hospital/updateHospital';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { HospitalService } from '../hospital.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css']
})
export class HospitalEditComponent implements OnInit , AfterViewInit {
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  updateHospitalForm: FormGroup = new FormGroup({});
  updatehospital: IUpdateHospital;
  hospital: IHospital;
  id: any;
  constructor(private toastr: ToastrService,
              private hospitalService: HospitalService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private upazilaAndDistrictService: UpazilaAndDistrictService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadDivision();
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
      address: ['', [Validators.required, Validators.maxLength(200)]],
      divisionId: [],
      upazilaId: [],
      districtId: [],
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
  loadDivision(){
    this.upazilaAndDistrictService.getAllDivision().subscribe(response => {
      this.divisions = response;
    });
  }
  loadDistrictBySelectDivision(id: number){
    this.upazilaAndDistrictService.getAllDistrictByDivisionId(id).subscribe(response => {
      this.districts = response;
    });
  }
  // loadDistrict(){
  //   this.upazilaAndDistrictService.getAllDistrict().subscribe(response => {
  //     this.districts = response;
  //   });
  // }
  loadUpazilaBySelectDistrict(id: number){
    this.upazilaAndDistrictService.getAllUpazilaByDistrictId(id).subscribe(response => {
      this.upazilas = response;
    });
  }
  populateHospitalFrom(){
    this.updateHospitalForm.patchValue({
      name: this.hospital.name,
      address: this.hospital.address,
      divisionId: this.hospital.divisionId,
      upazilaId: this.hospital.upazilaId,
      districtId: this.hospital.districtId,
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
