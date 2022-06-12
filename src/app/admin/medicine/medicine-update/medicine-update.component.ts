import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IManufacturar } from '../../../core/models/Medicine/manufacturar';
import { IMedicine } from '../../../core/models/Medicine/medicine';
import { MedicineService } from '../medicine.service';

@Component({
  selector: 'app-medicine-update',
  templateUrl: './medicine-update.component.html',
  styleUrls: ['./medicine-update.component.css']
})
export class MedicineUpdateComponent implements OnInit , AfterViewInit {
  updatemedicineForm: FormGroup = new FormGroup({});
  medicine: IMedicine;
  id: any;
  title = 'Update Medicine';
  manufacturar: IManufacturar[] = [];
  filteredManufacturar: Observable<IManufacturar[]>;
  manufacturarsearch = new FormControl();
  constructor(private toastr: ToastrService,
              private medicineService: MedicineService,
              private activateRoute: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private location: Location) { 
                this.filteredManufacturar = this.manufacturarsearch.valueChanges
                .pipe(
                  startWith(''),
                  map(p => p ? this._filterManufacturar(p) : this.manufacturar.slice())
                      );
              }

  ngOnInit(): void {
    this.loadMedicine();
    this.createUpdateHospitalForm();
    this.populateMedicineFrom();
  }
  ngAfterViewInit(){
    this.populateMedicineFrom();
  }
  createUpdateHospitalForm(){
    this.updatemedicineForm = this.fb.group({
      id: [this.id],
      medicineType: ['', [Validators.required, Validators.maxLength(40)]],
      brandName: ['', [Validators.required, Validators.maxLength(40)]],
      genericName: ['', [Validators.required, Validators.maxLength(50)]],
      manufacturarId: [],
      isActive: [true, Validators.required]
    });
  }
  loadManufacturar(search: string) {
    this.medicineService.getManufacturar(search).subscribe(response => {
      this.manufacturar = response;
    });
  }
  
  selectManufacturar(manufacturar: IManufacturar) {
    this.updatemedicineForm.patchValue(
      {
        manufacturarId : manufacturar.id
      }
      )
      this.manufacturarsearch.patchValue(manufacturar.name);
  }

  get f(){
    return this.updatemedicineForm.controls;
  }
  loadMedicine(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.medicineService.getMedicineById(this.id).subscribe(response => {
      console.log(response);
      this.medicine = response;
    }, error => {
      console.log(error);
    });
  }
  populateMedicineFrom(){
    this.updatemedicineForm.patchValue({
      medicineType: this.medicine.medicineType,
      brandName: this.medicine.brandName,
      genericName: this.medicine.genericName,
      manufacturarId: this.medicine.manufacturarId,
      isActive: this.medicine.isActive
    });
    this.manufacturarsearch.patchValue(this.medicine.manufacturar)
  }

  onSubmit(){
    this.medicineService.updateMedicine(this.updatemedicineForm.value).subscribe(response => {
      this.toastr.success('Updated');
      console.log(response);
      this.router.navigateByUrl('/medicine').then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
  private _filterManufacturar(value: any): IManufacturar[] {
    const filterValue = value.toLowerCase();
    this.loadManufacturar(filterValue);
    return this.manufacturar;
  }
  goBack(){
    this.location.back();
  }
}
