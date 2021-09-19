import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { VisitEntryService } from 'src/app/admin/visit-entry/visit-entry.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPhysicalState } from 'src/app/core/models/PhysicalState/getPhysicalState';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { PhysicalStateService } from '../../physical-state/physical-state.service';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-add',
  templateUrl: './prescription-add.component.html',
  styleUrls: ['./prescription-add.component.css']
})
export class PrescriptionAddComponent implements OnInit {

  prescriptionAddForm: FormGroup = new FormGroup({});
  prescription: IPrescription;
  hospitals: IHospital[];
  patients: IPatient[] = [
  ];
  physicalStates: IPhysicalState[];
  visitEntries: IVisitEntry[];
  filteredPatient: Observable<IPatient[]>;
  patientsearch = new FormControl();
  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private prescriptionService: PrescriptionService,
              private physicalStateService: PhysicalStateService,
              private hospitalService: HospitalService,
              private visitEntryService: VisitEntryService,
              private patientService: PatientService) {
                this.filteredPatient = this.patientsearch.valueChanges
                  .pipe(
                    startWith(''),
                    map(p => p ? this._filterPatient(p) : this.patients.slice())
                        );
              }

  ngOnInit(): void {
    this.loadHospital();
    this.loadPatient();
    this.loadVisitEntries();
    this.loadPhysicalStates();
    this.createPrescriptionAddForm();
  }

  createPrescriptionAddForm(){
    this.prescriptionAddForm = this.fb.group({
      visitEntryId: ['', Validators.required],
      physicalStateId: [],
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
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadPatient(){
    this.patientService.getAllPatient().subscribe(response => {
      this.patients = response;
    });
  }
  loadVisitEntries(){
    this.visitEntryService.getAllCurrentDayVisitEntry().subscribe(response => {
      this.visitEntries = response;
    });
  }
  loadPhysicalStates(){
    this.physicalStateService.getAllPhysicalStates().subscribe(response => {
      this.physicalStates = response;
    });
  }
  onSubmit(){
    this.prescriptionService.addPrescription(this.prescriptionAddForm.value).subscribe(response => {
      this.prescription = response;
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/prescription/edit/' + response.id).then(() => {location.reload(); } );
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
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
