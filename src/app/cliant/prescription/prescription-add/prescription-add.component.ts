import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesCliantService } from '../../visit-entries-cliant/visit-entries-cliant.service';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {
  title = 'Generate Prescription';
  prescriptionAddForm: FormGroup = new FormGroup({});
  prescription: IPrescription;
  hospitals: IHospitalSortByName[];
  patients: IPatient[] = [
  ];
  hospitalId: number;
  physicalStates: IPhysicalState[];
  visitEntries: IVisitEntry[];
  filteredPatient: Observable<IPatient[]>;
  patientsearch = new FormControl();
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private prescriptionService: PrescriptionService,
              private accountService: AccountService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntriesCliantService,
              private patientService: PatientService) {
                this.filteredPatient = this.patientsearch.valueChanges
                  .pipe(
                    startWith(''),
                    map(p => p ? this._filterPatient(p) : this.patients.slice())
                        );
              }

  ngOnInit(): void {
    this. getCurrectUserHospitalId();
    this.loadHospital();
    // this.loadPatient();
    this.loadVisitEntries();
    // this.loadPhysicalStates();
    this.createPrescriptionAddForm();
    if (this.hospitalId)
    {
      this.prescriptionAddForm.controls.hospitalId.patchValue(this.hospitalId);
    }
  }

  createPrescriptionAddForm(){
    this.prescriptionAddForm = this.fb.group({
      hospitalId: [],
      visitEntryId: ['', Validators.required],
      // physicalStateId: [],
      // doctorsObservation: ['', Validators.required],
      // adviceMedication: ['', Validators.required],
      // adviceTest: ['', Validators.required],
      // note: ['', Validators.required]
    });
  }

  get f(){
    return this.prescriptionAddForm.controls;
  }
  loadHospital(){
    this.hospitalService.getAllHospitalSortByName().subscribe(response => {
      this.hospitals = response;
    });
  }

  loadVisitEntries(){
    this.visitEntryService.getAllCurrentDayVisitEntry().subscribe(response => {
      this.visitEntries = response;
    });
  }

  // loadPatient(){
  //   this.patientService.getAllPatient().subscribe(response => {
  //     this.patients = response;
  //   });
  // }
  // loadPhysicalStates(){
  //   this.physicalStateService.getAllPhysicalStates().subscribe(response => {
  //     this.physicalStates = response;
  //   });
  // }


  // todays visit list according to hospital
  visitListAccordingToHospital(hospitalId) {
    this.visitEntryService.getTodayVisitEntriesAccordingToHospital(hospitalId).subscribe(response => {
      this.visitEntries = response;
    }, error => {
      console.log(error);
    });
    }
  onSubmit(){
    this.prescriptionService.addPrescription(this.prescriptionAddForm.value).subscribe(response => {
      if ( response.message === 'exist'){
        this.toastr.success( 'You can edit exist prescription' , 'Exist' );
        this.router.navigateByUrl('/prescription/list');
      } else {
        this.prescription = response;
        this.toastr.success( 'Added' , 'Success' );
        this.router.navigateByUrl('/prescription/edit/' + response.id).then(() => {location.reload(); } );
      }
      }

    );
  }
  getCurrectUserHospitalId(){
    const hospitalid =  this.accountService.getDecoadedHospitalIdFromToken();
    if (hospitalid){
         this.hospitalId = +hospitalid;
       }
   }

  private _filterPatient(value: string): IPatient[] {
    const filterValue = value.toLowerCase();
    const result = this.patients.filter(
      (p) =>
        p.firstName?.toLowerCase().includes(filterValue) ||
        p.lastName?.toLowerCase().includes(filterValue) ||
        p.mobileNumber?.toLowerCase().includes(filterValue)
    );
    return result;
  }
}
