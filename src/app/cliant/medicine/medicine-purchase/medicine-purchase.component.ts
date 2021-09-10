import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  price = new FormControl();
  totalPrice: number;
  filteredMedicine: Observable<IMedicine[]>;
  filteredMedicineByID: Observable<IMedicine[]>;
  filteredMedicineByGname: Observable<IMedicine[]>;
  private destroyed$ = new Subject<void>();
  linesChange = new EventEmitter<Medicine[]>();
  lines: Medicine[];

  medicine: IMedicine[] = [
  ];

  medicines: IMedicine[];
  filteredOptions: Observable<any[]>;
  medicinePurchaseForm: FormGroup;
  constructor(private medicineService: MedicineService, private fb: FormBuilder) {
    this.filteredMedicine = this.brandName.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filtermedicine(state) : this.medicine.slice())
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
    this.onLinesChange(this.lines);
  }
  private initForm() {
    this.medicinePurchaseForm = new FormGroup({
      prescriptionId: new FormControl(),
      subtotal: new FormControl(),
      purchaseMedicineList: new FormArray([])
    });
    this.medicinePurchaseForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(300)
    ).subscribe(value => {
       if (!this.medicinePurchaseForm.valid) {
         return;
       }
       this.lines = (value.purchaseMedicineList);
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
  }
  addMedicinetoLine(){
    this.medicineArray.push(this.getLineFormGroup());
  }

  getLineFormGroup(){
    const lineItem = this.fb.group({
          medicineId: new FormControl(this.medicineID.value, Validators.required),
          medicineName: new FormControl(this.brandName.value, Validators.required),
          unitPrice: new FormControl(this.price.value),
          quantity: new FormControl(this.quantity.value, Validators.required),
          itemTotal: new FormControl(),
    });
    lineItem.valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => this.calcTotal(lineItem));
    return lineItem;
  }
  calcTotal(line: FormGroup): void {
    const quantity =  +line.controls.quantity.value;
    const rate =      +line.controls.unitPrice.value;
    line.controls.itemTotal.setValue((quantity * rate).toFixed(2), {emitEvent: false});
  }
  onLinesChange(lines: Medicine[]) {
    const total = lines.map(line =>  {
      console.log(line, +line.itemTotal);
      return +line.itemTotal;
    }).reduce((x, y) => x + y, 0);
    this.totalPrice = total;
  }
  calculateTotal(): void {
    if(this.medicinePurchaseForm.get('unitPrice').value === null && this.medicinePurchaseForm.get('quantity').value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else if (this.medicinePurchaseForm.get('unitPrice').value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else if (this.medicinePurchaseForm.get('quantity').value === null) {
        this.medicinePurchaseForm.patchValue({
            itemTotal: 0.00
        });
    } else {
        this.medicinePurchaseForm.patchValue({
            itemTotal: +(this.medicinePurchaseForm.get('unitPrice').value) * +(this.medicinePurchaseForm.get('quantity').value)
        });
    }
}

  onSubmit(){
    console.log(this.medicinePurchaseForm.value);
  }
  getAllMedicine(){
    this.medicineService.getAllMedicine().subscribe(value => {
      this.medicine = value;
    });
  }
  private _filtermedicine(value: string): IMedicine[] {
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
