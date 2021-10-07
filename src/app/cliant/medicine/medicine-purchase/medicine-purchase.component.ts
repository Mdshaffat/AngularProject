import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { IMedicinePurchase, Medicine } from 'src/app/core/models/Medicine/medicinePurchase';
import { MedicineService } from '../medicine.service';
export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-medicine-purchase',
  templateUrl: './medicine-purchase.component.html',
  styleUrls: ['./medicine-purchase.component.css']
})
export class MedicinePurchaseComponent implements OnInit {
  trial: any;
  medicinePurchase: IMedicinePurchase;
  medicineID = new FormControl();
  brandName = new FormControl();
  genericName = new FormControl();
  quantity = new FormControl();
  itemTotal = new FormControl();
  price = new FormControl();
  stock = new FormControl();
  currentStock = new FormControl();
  totalPrice = 0;
  filteredMedicine: Observable<IMedicine[]>;
  filteredMedicineByID: Observable<IMedicine[]>;
  filteredMedicineByGname: Observable<IMedicine[]>;
  medicine: IMedicine[] = [
  ];

  medicines: IMedicine[];
  filteredOptions: Observable<any[]>;
  medicinePurchaseForm: FormGroup;


  constructor(private medicineService: MedicineService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.filteredMedicine = this.brandName.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filtermedicineByBName(state) : this.medicine.slice())
    );
    this.filteredMedicineByGname = this.genericName.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filtermedicineByGName(state) : this.medicine.slice())
    );
    this.filteredMedicineByID = this.medicineID.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filtermedicineid(state) : this.medicine.slice())
    );
  }
  ngOnInit(): void {
    this.getAllMedicine();
    this.initForm();
  }
  private initForm() {
    this.medicinePurchaseForm = new FormGroup({
      prescriptionId: new FormControl(),
      purchaseMedicineList: new FormArray([])
    });
  }
  get medicineArray() {
    return this.medicinePurchaseForm.controls.purchaseMedicineList as FormArray;
  }
  selectMedicine(value: IMedicine) {
    this.medicineID.setValue(value.id);
    this.genericName.setValue(value.genericName);
    this.brandName.setValue(value.brandName);
    this.price.setValue(value.unitPrice);
    this.stock.setValue(value.unit);
    this.currentStock.setValue(value.unit);
  }
  addMedicinetoLine(){
    this.medicineArray.push(this.getLineFormGroup());
    this.medicineID.reset();
    this.genericName.reset();
    this.brandName.reset();
    this.price.reset();
    this.stock.reset();
    this.currentStock.reset();
    this.quantity.reset();
    this.itemTotal.reset();
    this.totalPrice = 0;
    this.calculateTotal();
  }

  getLineFormGroup(){
    const lineItem = this.fb.group({
          medicineId: new FormControl(this.medicineID.value, Validators.required),
          medicineName: new FormControl(this.brandName.value, Validators.required),
          unitPrice: new FormControl(this.price.value),
          quantity: new FormControl(this.quantity.value, Validators.required),
          itemTotal: new FormControl(this.itemTotal.value),
    });
    return lineItem;
  }
  calculateItemTotal(): void {
    if (this.price.value === null && this.quantity.value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else if (this.price.value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else if (this.quantity.value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else {
        this.itemTotal.patchValue( +(this.price.value) * +(this.quantity.value)
        );
        this.currentStock.patchValue(+(this.stock.value) - +(this.quantity.value));
    }
  }
  calculateTotal(){
    for (const controls of this.medicineArray.controls) {
      this.totalPrice = this.totalPrice + controls.get('itemTotal').value;
  }
    return this.totalPrice;
  }

  onSubmit(){
    this.medicineService.postPurchaseMedicine(this.medicinePurchaseForm.value).subscribe(response => {
      if (response.message === 'success'){
        this.toastr.success( 'Success' );
        this.medicinePurchaseForm = new FormGroup({
          prescriptionId: new FormControl(),
          purchaseMedicineList: new FormArray([])
        });
        this.totalPrice = 0;
        this.getAllMedicine();
      }
      if (response.message === 'faild'){
        this.toastr.error( 'FAILED', response.data );
        console.log(response);
      }

    }, error => {
      this.toastr.error( 'FAILED' );
      console.log(error);
    });
  }
  onDelete(i: number) {
      this.totalPrice = this.totalPrice - this.medicineArray.controls[i].get('itemTotal').value;
      this.medicineArray.removeAt(i);
  }
  getAllMedicine(){
    this.medicineService.getAllMedicine().subscribe(value => {
      this.medicine = value;
    });
  }
  private _filtermedicineByBName(value: string): IMedicine[] {
    const filterValue = value.toLowerCase();

    return this.medicine.filter(state => state.brandName.toLowerCase().includes(filterValue));
  }
  private _filtermedicineByGName(value: string): IMedicine[] {
    const filterValue = value.toLowerCase();

    return this.medicine.filter(state => state.genericName.toLowerCase().includes(filterValue));
  }
  private _filtermedicineid(value: number): IMedicine[] {
    const result = this.medicine.filter(x => x.id === value);
    return result;
  }
}
