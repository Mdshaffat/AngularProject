import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IManufacturar } from 'src/app/core/models/Medicine/manufacturar';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-add',
  templateUrl: './medicine-add.component.html',
  styleUrls: ['./medicine-add.component.css']
})
export class MedicineAddComponent implements OnInit { 
title = 'Add Medicine';
manufacturar: IManufacturar[] = [];
medicineAddForm: FormGroup = new FormGroup({});
filteredManufacturar: Observable<IManufacturar[]>;
manufacturarsearch = new FormControl();
constructor(private toastr: ToastrService,
            private fb: FormBuilder,
            private router: Router,
            private medicineService: MedicineService,
            ) { 
              this.filteredManufacturar = this.manufacturarsearch.valueChanges
              .pipe(
                startWith(''),
                map(p => p ? this._filterManufacturar(p) : this.manufacturar.slice())
                    );
            }

ngOnInit(): void {
  this.createmedicineAddForm();
}

createmedicineAddForm(){
  this.medicineAddForm = this.fb.group({
    medicineType: ['', [Validators.required, Validators.maxLength(40)]],
    brandName: ['', [Validators.required, Validators.maxLength(40)]],
    genericName: ['', [Validators.required, Validators.maxLength(50)]],
    manufacturarId: [],
  });
}

loadManufacturar(search: string) {
  this.medicineService.getManufacturar(search).subscribe(response => {
    this.manufacturar = response;
  });
}

selectManufacturar(manufacturar: IManufacturar) {
  this.medicineAddForm.patchValue(
    {
      manufacturarId : manufacturar.id
    }
    )
    this.manufacturarsearch.patchValue(manufacturar.name);
}
get f(){
  return this.medicineAddForm.controls;
}

onSubmit(){
  this.medicineService.addMedicine(this.medicineAddForm.value).subscribe(response => {
    if (response.message === 'exist')
    {
      this.toastr.error( 'Medicine Brand Name Already Exist' , 'Error' );
    } else {
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/medicine').then(() => {location.reload(); } );
    }
  }, error => {
    console.log(error);
    this.toastr.error('Error to Create.Please check your connection and try again');
  });
}
private _filterManufacturar(value: any): IManufacturar[] {
  const filterValue = value.toLowerCase();
  this.loadManufacturar(filterValue);
  return this.manufacturar;
}
}
