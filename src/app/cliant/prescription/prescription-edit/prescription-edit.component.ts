import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { MedicineService } from 'src/app/admin/medicine/medicine.service';
import { IDiseases } from 'src/app/core/models/Diagnosis/diseases';
import { IDiseasesCategory } from 'src/app/core/models/Diagnosis/diseasesCategory';
import { IMedicineForSearch } from 'src/app/core/models/Medicine/IMedicineForSearch';
import { IPrescriptionWithPhysicalStatAndDiagnosis } from 'src/app/core/models/Prescriptions/prescriptionWithPhysicalStatAdnDiagnosis';
import Swal from 'sweetalert2';
import { DignosisService } from '../../diagnosis/dignosis.service';
import { DiseasesComponent } from '../diseases/diseases.component';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-edit',
  templateUrl: './prescription-edit.component.html',
  styleUrls: ['./prescription-edit.component.css']
})
export class PrescriptionEditComponent implements OnInit, AfterViewInit {
  prescriptionUpdateForm: FormGroup = new FormGroup({});
  prescription: IPrescriptionWithPhysicalStatAndDiagnosis;
  id: any;
  patientAge: number ;
  isAlergicHistory: boolean;
  diseasesCategory: IDiseasesCategory[] = [];
  diseases: IDiseases[] = [];
  currentDate = moment();
  medicineForSearch: IMedicineForSearch[] = [];
  // medicine Form Control
  medicineId = new FormControl();
  brandName = new FormControl();
  medicineType = new FormControl();
  prescriptionId = new FormControl();
  dose = new FormControl() ;
  time = new FormControl();
  comment = new FormControl('', [Validators.maxLength(100)]);
  filteredMedicine: Observable<IMedicineForSearch[]>;
  // End Medicine Form Control
    // deases controller
    diseasesCategoryId: number;
    diseasesId: number;
    diseasesName: string;
    diseasesCategoryControl = new FormControl();
    diseasesCategoryIdControl = new FormControl();
    diseasesNameControl = new FormControl();
    isDoctor$: Observable<boolean>;
    // deases controller
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              public dialog: MatDialog,
              private activateRoute: ActivatedRoute,
              private prescriptionService: PrescriptionService,
              private dignosisService: DignosisService,
              private medicineService: MedicineService,
              private location: Location,
              private accountService: AccountService
              ) {
                this.filteredMedicine = this.brandName.valueChanges
                .pipe(
                  startWith(''),
                  map(state => state ? this._filterMedicine(state) : this.medicineForSearch.slice())
                );
              }
  ngOnInit(): void {
    this.isDoctor$ = this.accountService.isdesignationDoctor$;
    this.addUpdatePrescriptionForm();
    this.loadPrescription();
    this.loadDiseasesCategory();
    // this.populatePrescriptionUpdateFrom();
    // this.CalculateAge();
    // this.patientAge = this.calculateAge(this.prescription.patientDob.getDate);
  }
  ngAfterViewInit(){

  }
  openDialog(): void {
    if (this.diseasesCategoryIdControl.value) {
      const dialogRef = this.dialog.open(DiseasesComponent, {
        width: '250px',
        data: {diseasesCategoryId: this.diseasesCategoryIdControl.value, diseasesCategoryName: this.diseasesNameControl.value},
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result.name) {
          this.dignosisService.addDiseases(result).subscribe(response => {
            if (response.message === 'success') {
              Swal.fire({
                icon: 'success',
                title: 'Saved',
                showConfirmButton: true,
                timer: 1500
              });
              this.loadDiseases(this.diseasesCategoryControl.value);
            }
            else if (response.message === 'failed'){
              Swal.fire({
                icon: 'error',
                title: 'Already exist in ' + response.data + ' Category',
                // showConfirmButton: false,
                timer: 1500
              });
            }
            else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error to create',
              });
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Enter a Disease name',
          });
        }
      }, error => {
        console.log(error);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Select a Disease Category',
      });
    }
  }
  addUpdatePrescriptionForm(){
    this.prescriptionUpdateForm = this.fb.group({
      id: [],
      hospitalId: ['', Validators.required],
      patientId: ['', Validators.required],
      visitEntryId: ['', Validators.required],
      physicalStateId: [],
      doctorsObservation: ['', Validators.maxLength(2000)],
      adviceMedication: ['', Validators.maxLength(2000)],
      oh: [ , Validators.maxLength(500)],
      mh: [ , Validators.maxLength(500)],
      dx: [ , Validators.maxLength(500)],
      systemicExamination: [ , Validators.maxLength(500)],
      historyOfPastIllness: [ , Validators.maxLength(500)],
      familyHistory: [ , Validators.maxLength(500)],
      allergicHistory: [ , Validators.maxLength(500)],
      adviceTest: ['', Validators.maxLength(2000)],
      nextVisit: [ ],
      isTelimedicine: [false],
      note: ['', Validators.maxLength(2000)],
      diagnosis: this.fb.array([
       // this.fb.control('')
      ]),
      medicineForPrescription: this.fb.array([
       // this.fb.control('')
      ])
    });
  }

  get f(){
    return this.prescriptionUpdateForm.controls;
  }
  get diagnosis() {
    return this.prescriptionUpdateForm.get('diagnosis') as FormArray;
  }
  get medicineForPrescription() {
    return this.prescriptionUpdateForm.get('medicineForPrescription') as FormArray;
  }
  addDiagnosis() {
    this.diagnosis.push(
      this.getLineFormGroup()
      );
  }
  addMedicineForPrescription(){
    if (this.medicineId.value){
      this.medicineForPrescription.push(
        this.getmedicineFormGroup()
      );
      this.medicineId.patchValue('');
      this.brandName.patchValue('');
      this.medicineType.patchValue('');
      this.dose.patchValue('');
      this.time.patchValue('');
      this.comment.patchValue('');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Select A Medicine',
      });
    }
  }

  getLineFormGroup(){
    const lineItem = this.fb.group({
      diseasesCategoryId: new FormControl(this.diseasesCategoryId, Validators.required),
      diseasesId: new FormControl(this.diseasesId, Validators.required),
      diseasesName: new FormControl(this.diseasesName),
    });
    return lineItem;
  }
  getmedicineFormGroup(){
    const lineItem = this.fb.group({
      medicineId : new FormControl(this.medicineId.value),
      brandName : new FormControl(this.brandName.value),
      medicineType: new FormControl(this.medicineType.value),
      dose : new FormControl(this.dose.value),
      time : new FormControl(this.time.value),
      comment : new FormControl(this.comment.value)
    });
    return lineItem;
  }
  loadMedicine(search: string) {
    this.medicineService.getmedicineForSearch(search).subscribe(response => {
      this.medicineForSearch = response;
    });
  }
  selectDiseases(diseases: IDiseases)
  {
    this.diseasesCategoryId = diseases.diseasesCategoryId,
    this.diseasesId = diseases.id,
    this.diseasesName = diseases.name;
    this.addDiagnosis();
  }
  selectMedicine(medicine: IMedicineForSearch){
    this.brandName.patchValue(medicine.brandName);
    this.medicineType.patchValue(medicine.medicineType);
    this.medicineId.patchValue(medicine.id);
  }
  deleteDiagnosisFromList(i)
  {
    this.diagnosis.removeAt(i);
  }
  loadPrescription(){
    this.id =  this.activateRoute.snapshot.paramMap.get('id');
    this.prescriptionService.getPrescriptionById(this.id).subscribe(response => {
      this.prescription = response;
      if (response){
        this.populatePrescriptionUpdateFrom();
      }
    }, error => {
      console.log(error);
    });
  }
  populatePrescriptionUpdateFrom(){
    this.prescriptionUpdateForm.patchValue({
      id: this.prescription.id,
      hospitalId: this.prescription.hospitalId,
      patientId: this.prescription.patientId,
      visitEntryId: this.prescription.visitEntryId,
      doctorsObservation: this.prescription.doctorsObservation,
      adviceMedication: this.prescription.adviceMedication,
      adviceTest: this.prescription.adviceTest,
      oh: this.prescription.oh,
      mh: this.prescription.mh,
      dx: this.prescription.dx,
      systemicExamination: this.prescription.systemicExamination,
      historyOfPastIllness: this.prescription.historyOfPastIllness,
      familyHistory: this.prescription.familyHistory,
      allergicHistory: this.prescription.allergicHistory,
      nextVisit: this.prescription.nextVisit,
      isTelimedicine: this.prescription.isTelimedicine,
      note: this.prescription.note,
     // diagnosis:
    });
    this.prescription.diagnosis.forEach(element => {
        this.diagnosis.push(
          this.fb.group({
            diseasesCategoryId: new FormControl(element.diseasesCategoryId, Validators.required),
            diseasesId: new FormControl(element.diseasesId, Validators.required),
            diseasesName: new FormControl(element.diseases.name),
          })
        );
      });
    this.prescription.medicineForPrescription.forEach(element => {
        this.medicineForPrescription.push(
          this.fb.group({
            medicineId : new FormControl(element.medicineId),
            medicineType: new FormControl(element.medicineType),
            brandName : new FormControl(element.brandName), 
            dose : new FormControl(element.dose),
            time : new FormControl(element.time),
            comment : new FormControl(element.comment)
          })
        );
      });
  }
  loadDiseasesCategory(){
    this.dignosisService.getDiseasesCategory().subscribe( response => {
      this.diseasesCategory = response;
    });
  }
  loadDiseases(category: IDiseasesCategory){
    if (category)
    {
      this.diseasesCategoryIdControl.patchValue(category.id);
      this.diseasesNameControl.patchValue(category.name);
      this.dignosisService.getDiseasesByCategoryId(category.id).subscribe( response => {
        this.diseases = response;
      });
    }else {
      this.diseasesCategoryIdControl.patchValue(null);
      this.diseases = [];
    }
  }
  private _filterMedicine(value: any): IMedicineForSearch[] {
    const filterValue = value.toLowerCase();
    this.loadMedicine(filterValue);
    return this.medicineForSearch;
  }
  onDelete(i: number) {
    this.medicineForPrescription.removeAt(i);
}
  onSubmit(){
    console.log(this.prescriptionUpdateForm.value);
    this.prescriptionService.updatePrescription(this.prescriptionUpdateForm.value).subscribe(response => {
      this.toastr.success(' Updated');
      console.log(response);
      this.router.navigateByUrl('/prescription/details/' + this.id).then(() => {location.reload(); } );
    },
    error => {
      this.toastr.error('error to Update');
      console.log(error);
    }
    );
  }
  public calculateAge(birthdate: any): number {
    const age =  moment().diff(birthdate, 'years');
    return age;
  }
  public CalculateAge(): void {
    if (this.prescription.patientDob) {
      const timeDiff = Math.abs(Date.now() - new Date(this.prescription.patientDob).getTime());
      this.patientAge = Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
        }
      }
  goBack(){
    this.location.back();
  }

}
