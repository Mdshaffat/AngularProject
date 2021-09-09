import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IMedicine } from 'src/app/core/models/Medicine/medicine';
import { IMedicinePurchase } from 'src/app/core/models/Medicine/medicinePurchase';
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
  medicinePurchase: IMedicinePurchase;
  medicineID = new FormControl();
  brandName = new FormControl();
  genericName = new FormControl();
  quantity = new FormControl();
  price = new FormControl();
  filteredMedicine: Observable<IMedicine[]>;
  filteredMedicineByID: Observable<IMedicine[]>;
  filteredMedicineByGname: Observable<IMedicine[]>;

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
  }
  private initForm() {
    this.medicinePurchaseForm = new FormGroup({
      prescriptionId: new FormControl(),
      purchaseMedicineList: new FormArray([
        new FormGroup ({
          medicineId: new FormControl(),
          medicineName: new FormControl(),
          unitPrice: new FormControl(),
          quantity: new FormControl()
        })
      ])
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
    const purchasemedicine = new FormGroup({
          medicineId: new FormControl(this.medicineID.value, Validators.required),
          medicineName: new FormControl(this.brandName.value, Validators.required),
          unitPrice: new FormControl(this.price.value),
          quantity: new FormControl(this.quantity.value, Validators.required),
    });
    this.medicineArray.push(purchasemedicine);
  }

  deleteLesson(i: number){
    // this.lesson.removeAt(i);
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
