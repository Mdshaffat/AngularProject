import { DatePipe } from '@angular/common';
import { identifierModuleUrl } from '@angular/compiler';
import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap, map, startWith, switchMap } from 'rxjs/operators';
import { AccountService } from 'src/app/account/account.service';
import { HospitalService } from 'src/app/admin/hospital/hospital.service';
import { IHospital } from 'src/app/core/models/Hospital/hospital';
import { IHospitalSortByName } from 'src/app/core/models/Hospital/hospitalsortbyname';
import { IPatient } from 'src/app/core/models/Patient/patient';
import { IPatientForSearch } from 'src/app/core/models/Patient/patientForSearch';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { PatientService } from '../../patient/patient.service';
import { VisitEntriesCliantService } from '../visit-entries-cliant.service';


@Component({
  selector: 'app-visit-entries-add',
  templateUrl: './visit-entries-add.component.html',
  styleUrls: ['./visit-entries-add.component.css']
})
export class VisitEntriesAddComponent implements OnInit, AfterViewInit{
  title = 'Add Visit Entries';
  patients: IPatient [] = [];
  PatientsForSearch: IPatientForSearch[] = [];
  patientsForSearch = new BehaviorSubject<IPatientForSearch[]>([]);
  filteredPatient: Observable<IPatientForSearch[]>;
  visitEntries: IVisitEntry [];
  hospitals: IHospitalSortByName [];
  hospitalId: number;
  lastSerialNumber: number;
  patientsearch = new FormControl();
  visitEntryAddForm: FormGroup = new FormGroup({});
  minLengthTerm = 3;

  date = new Date();
  latestdate = this.datepipe.transform(this.date, 'yyyy-MM-dd');

  constructor(private toastr: ToastrService,
              private fb: FormBuilder,
              private router: Router,
              private visitEntryService: VisitEntriesCliantService,
              private hospitalService: HospitalService,
              private accountService: AccountService,
              private patientService: PatientService,
              public datepipe: DatePipe) {
                this.patientsearch.valueChanges
                .pipe(
                  filter(res => {
                    return res !== null && res.length >= this.minLengthTerm
                  }),
                  distinctUntilChanged(),
                  debounceTime(1500),
                  tap(() => {
                    this.PatientsForSearch = [];
                  }),
                  switchMap(value => this.patientService.getPatientForSearch(value)
                  )).subscribe(res => {
                    this.PatientsForSearch = res;
                  })
              }
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this. getCurrectUserHospitalId();
    this.loadAllHospital();
    // this.loadAllPatient();
    // this.loadDateWiseSerialNumber(this.latestdate);
    // this.loadLastSerialNumber();
    this.createVisitEntryAddForm();
    if (this.hospitalId)
    {
      this.visitEntryAddForm.controls.hospitalId.patchValue(this.hospitalId);
    }
    // this.f.serial.patchValue(this.lastSerialNumber);
  }

  createVisitEntryAddForm(){
    this.visitEntryAddForm = this.fb.group({
      hospitalId: [],
      patientId: ['', Validators.required],
      date: ['', Validators.required],
      serial: [ '', Validators.required]
    });

  }

  get f(){
    return this.visitEntryAddForm.controls;
  }

  loadAllPatient(search: string){
      this.patientService.getPatientForSearch(search).subscribe(response => {
      this.PatientsForSearch = response;
    });
  }

  loadAllHospital(){
    this.hospitalService.getAllHospitalSortByName().subscribe(response => {
      this.hospitals = response;
    });
  }
  onSelectPatient(patient: IPatientForSearch){
    const today = new Date();
    const dateToString = moment(today).format('YYYY-MM-DD');
    const hospitalId = this.visitEntryAddForm.value.hospitalId;
    if (hospitalId !== null || hospitalId !== undefined) {
      this.visitEntryService.getLastVisitNumberAccordingToDateAndHospital(dateToString, hospitalId).subscribe(response => {
        this.lastSerialNumber = response;
      }, error => {
        console.log(error);
      }, () => {
        this.visitEntryAddForm.controls.serial.patchValue(this.lastSerialNumber);
      });
    } else{
      this.visitEntryService.getLastVisitNumberAccordingToDateAndHospital(dateToString).subscribe(response => {
        this.lastSerialNumber = response;
      }, error => {
        console.log(error);
      }, () => {
        this.visitEntryAddForm.controls.serial.patchValue(this.lastSerialNumber);
      });
    }
    this.visitEntryAddForm.patchValue({
      date: new Date(),
      patientId: patient.id
    });
    this.patientsearch.patchValue(patient.firstName);
  }
  // loadLastSerialNumber(){
  //   this.visitEntryService.getlastvisitnumber().subscribe(response => {
  //     this.lastSerialNumber = response;
  //   });
  // }
  // loadDateWiseSerialNumber(date: string){
  //   this.visitEntryService.getDateWisevisitNumber(date).subscribe(response => {
  //     this.lastSerialNumber = response;
  //   });
  // }


  loadSerialByDate(){
    const dateToString = moment(this.visitEntryAddForm.value.date).format('YYYY-MM-DD');
    const hospitalId = this.visitEntryAddForm.value.hospitalId;
    if (hospitalId !== null && hospitalId !== undefined) {
      this.visitEntryService.getLastVisitNumberAccordingToDateAndHospital(dateToString, hospitalId).subscribe(response => {
        this.lastSerialNumber = response;
      }, error => {
        console.log(error);
      }, () => {
        this.visitEntryAddForm.controls.serial.patchValue(this.lastSerialNumber);
      });
    } else{
      this.visitEntryService.getDateWisevisitNumber(dateToString).subscribe(response => {
        this.lastSerialNumber = response;
      }, error => {
        console.log(error);
      }, () => {
        this.visitEntryAddForm.controls.serial.patchValue(this.lastSerialNumber);
      });
    }
  }
  onSubmit(){
    this.visitEntryService.addVisitEntry(this.visitEntryAddForm.value).subscribe(response => {
      if (response.message === 'exist'){
        this.toastr.error( 'Visit Exist');
        this.router.navigateByUrl('/visitentries/list');
      } else {
        this.toastr.success( 'Added' , 'Success' );
        this.router.navigateByUrl('/visitentries/list').then(() => {location.reload(); } );
      }
    }, error => {
      console.log(error);
      this.toastr.error('Error to Create.Please check your connection and try again');
    });
  }
  getCurrectUserHospitalId(){
    const hospitalid =  this.accountService.getDecoadedHospitalIdFromToken();
    if (hospitalid){
         this.hospitalId = +hospitalid;
       }
   }

   loadserial() {
    if(+this.visitEntryAddForm.controls.hospitalId.value > 0)
    {
      if(+this.visitEntryAddForm.controls.patientId.value >= 1)
      {
        this.patientService.getPatientForSearchById(+this.visitEntryAddForm.controls.patientId.value).subscribe(res => {
          this.onSelectPatient(res);
        }, err => {
          if(err.error.statusCode === 404)
          {
            this.visitEntryAddForm.reset();
            this.toastr.error("Patient Not Found");
          } else {
            this.visitEntryAddForm.reset();
            this.toastr.error(err.error.message);
          }
        })
      } else {
        this.toastr.error('please Input valid Patient Id')
      }
    }
    else {
      this.toastr.error('Please select Branch')
    }


   }
  // private _filterPatient(value: any): Observable<IPatientForSearch[]> {
  //   const filterValue = value.toLowerCase();
  //   return this.patientService.getPatientForSearch(filterValue);
  // }
}
