import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IPrescription } from 'src/app/core/models/Prescriptions/getPrescriptions';
import { IUserTokenProvider } from 'src/app/core/models/UserTokenProvider';
import { PrescriptionService } from '../prescription.service';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit , AfterViewInit {
  currentUser$: Observable<IUserTokenProvider>;
  isAdmin$: Observable<boolean>;
  isDoctor$: Observable<boolean>;
  displayedColumns: string[] = ['Id', 'PatientId', 'PatientName', 'PatientMobile', 'DoctorName', 'CreatedOn', 'Action'];
  prescriptions: IPrescription[] = [];
  dataSource = new MatTableDataSource<IPrescription>(this.prescriptions);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private prescriptionService: PrescriptionService, private accountService: AccountService) { }
  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
    this.isAdmin$ = this.accountService.isAdmin$;
    this.isDoctor$ = this.accountService.isDoctor$;
    this.getPhysicalStateList();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getPhysicalStateList(){
    this.prescriptionService.getAllPrescriptions().subscribe(response => {
      this.prescriptions = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

