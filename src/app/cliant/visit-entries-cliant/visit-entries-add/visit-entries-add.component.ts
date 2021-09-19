import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesCliantService } from '../visit-entries-cliant.service';


@Component({
  selector: 'app-visit-entries-add',
  templateUrl: './visit-entries-add.component.html',
  styleUrls: ['./visit-entries-add.component.css']
})
export class VisitEntriesAddComponent implements OnInit, AfterViewInit{
  patients: IPatient [];
  filteredPatient: Observable<IPatient[]>;
  visitEntries: IVisitEntry [];
  hospitals: IHospital [];
  lastSerialNumber: number;
  patientsearch = new FormControl();
  visitEntryAddForm: FormGroup = new FormGroup({});

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private visitEntryService: VisitEntriesCliantService,
              private hospitalService: HospitalService,
              private patientService: PatientService) {
                this.filteredPatient = this.patientsearch.valueChanges
                .pipe(
                  startWith(''),
                  map(p => p ? this._filterPatient(p) : this.patients.slice())
                      );
              }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.loadAllHospital();
    this.loadAllPatient();
    this.loadLastSerialNumber();
    this.createVisitEntryAddForm();
    // this.f.serial.patchValue(this.lastSerialNumber);
  }

  createVisitEntryAddForm(){
    this.visitEntryAddForm = this.fb.group({
      date: ['', Validators.required],
      patientId: ['', Validators.required],
      serial: [ '', Validators.required]
    });

  }

  get f(){
    return this.visitEntryAddForm.controls;
  }

  onSelectPatient(patient: IPatient){
    this.visitEntryAddForm.patchValue({
      date: new Date(),
      patientId: patient.id,
      serial: this.lastSerialNumber
    });
    this.patientsearch.patchValue(patient.firstName);
   // this.f.serial.setValue(this.lastSerialNumber);
  }

  loadAllPatient(){
    this.patientService.getAllPatient().subscribe(response => {
      this.patients = response;
    });
  }
  loadAllHospital(){
    this.hospitalService.getAllHospital().subscribe(response => {
      this.hospitals = response;
    });
  }
  loadLastSerialNumber(){
    this.visitEntryService.getlastvisitnumber().subscribe(response => {
      this.lastSerialNumber = response;
    });
  }


  onSubmit(){
    this.visitEntryService.addVisitEntry(this.visitEntryAddForm.value).subscribe(response => {
      this.toastr.success( 'Added' , 'Success' );
      this.router.navigateByUrl('/visitentries/list').then(() => {location.reload(); } );
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
