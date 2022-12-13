import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/account/account.service';
import { IBloodGroup } from 'src/app/core/models/Doner/bloodgroup';
import { IDistrict } from 'src/app/core/models/UpazilaAndDistrict/district';
import { IDivision } from 'src/app/core/models/UpazilaAndDistrict/division';
import { IUpazila } from 'src/app/core/models/UpazilaAndDistrict/upazila';
import { UpazilaAndDistrictService } from '../../patient/upazila-and-district.service';
import { BloodCampService } from '../blood-camp.service';

@Component({
  selector: 'app-add-single-blood-camp',
  templateUrl: './add-single-blood-camp.component.html',
  styleUrls: ['./add-single-blood-camp.component.css']
})
export class AddSingleBloodCampComponent implements OnInit {
  title = 'Add Doner';
  upazilas: IUpazila[] = [];
  districts: IDistrict[] = [];
  divisions: IDivision[] = [];
  bloodGroups: IBloodGroup[] = [];

  // form
  donerAddForm: FormGroup = new FormGroup({});
  constructor(
                private bloodCampService: BloodCampService,
                private upazilaAndDistrictService: UpazilaAndDistrictService,
                private router: Router,
                private toastr: ToastrService,
                private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
      this.loadDivision();
      this.loadBloodGroup();
      this.createDonerAddForm();
  }
  createDonerAddForm(){
    this.donerAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      mobileNumber: ['', [Validators.required, Validators.maxLength(11)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      bloodGroupId: [],
      divisionId: [],
      districtId: [],
      upazilaId: []
    });
  }
  get f(){
    return this.donerAddForm.controls;
  }
    onSubmit(){
     this.bloodCampService.addDoners(this.donerAddForm.value).subscribe(response => {
        if (response.message === 'success')
         {
          this.toastr.success( 'Added' , 'Success' );
          this.router.navigateByUrl('/bloodcamp').then(() => {location.reload(); } );
        }
      }, error => {
        console.log(error);
        this.toastr.error('Error to Create.Please check your connection and try again');
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

  loadUpazilaBySelectDistrict(id: number){
    this.upazilaAndDistrictService.getAllUpazilaByDistrictId(id).subscribe(response => {
      this.upazilas = response;
    });
  }
  loadBloodGroup(){
    this.upazilaAndDistrictService.getAllBloodGroup().subscribe(response => {
      this.bloodGroups = response;
    });
  }
}
