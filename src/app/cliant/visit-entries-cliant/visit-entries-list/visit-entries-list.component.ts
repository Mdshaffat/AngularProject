import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { VisitEntriesAddComponent } from '../visit-entries-add/visit-entries-add.component';
import { VisitEntriesCliantService } from '../visit-entries-cliant.service';
import { VisitEntriesEditComponent } from '../visit-entries-edit/visit-entries-edit.component';
import { VisitEntriesStatusUpdateComponent } from '../visit-entries-status-update/visit-entries-status-update.component';

@Component({
  selector: 'app-visit-entries-list',
  templateUrl: './visit-entries-list.component.html',
  styleUrls: ['./visit-entries-list.component.css']
})
export class VisitEntriesListComponent implements OnInit  , AfterViewInit {
  displayedColumns: string[] = ['HospitalName', 'Date', 'FirstName', 'LastName', 'Serial',
                                 'Status', 'EditStatus', 'Action'];
  visitEntries: IVisitEntry[] = [];
  dataSource = new MatTableDataSource<IVisitEntry>(this.visitEntries);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private visitEntryService: VisitEntriesCliantService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getPatientList();
    this.dataSource.paginator = this.paginator;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getPatientList(){
    this.visitEntryService.getAllVisitEntry().subscribe(response => {
      this.visitEntries = response;
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
  // For Add And Updade Dialog Box
  // Add visit Entry
  openVisitEntryAddDialog() {
    const dialogBoxWithData = this.dialog.open(VisitEntriesAddComponent, {
      width: '80%',
    });
    dialogBoxWithData.afterClosed().subscribe(result => {
        this.patientVitalAddRowData(result.data);
    });
  }

  patientVitalAddRowData(data: any){
      this.visitEntryService.addVisitEntry(data).subscribe(response => {
        this.toastr.success('Added');
        location.reload();
        console.log(response);
      }, error => {
        console.log(error);
        this.toastr.error('Error to Add.');
      });
    }

    // Update VisitEntry
    openUpdateVisitEntryDialog(obj: any) {
      const dialogBoxWithData = this.dialog.open(VisitEntriesEditComponent, {
        width: '80%',
        data: obj
      });
      dialogBoxWithData.afterClosed().subscribe(result => {
          this.updateVisitEntryRowData(result.data);
          console.log(result.data);
      });
    }

    updateVisitEntryRowData(data: any){
        this.visitEntryService.updateVisitEntry(data).subscribe(response => {
          this.toastr.success('Updated');
          location.reload();
          console.log(response);
        }, error => {
          console.log(error);
          location.reload();
          this.toastr.error('Error to Update.');
        });
      }

     // Update VistEntry Status
    openUpdateVisitEntryStatusDialog(obj: any) {
      const dialogBoxWithData = this.dialog.open(VisitEntriesStatusUpdateComponent, {
        width: '80%',
        data: obj
      });
      dialogBoxWithData.afterClosed().subscribe(result => {
          this.updateVisitEntryStatusRowData(result.data);
      });
    }

    updateVisitEntryStatusRowData(data: any){
        this.visitEntryService.updateVisitEntryStatus(data).subscribe(response => {
          this.toastr.success('Updated');
          location.reload();
          console.log(response);
        }, error => {
          console.log(error);
          this.toastr.error('Error to Update.');
        });
      }
}
