import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { IVisitEntry } from 'src/app/core/models/VisitEntry/visitEntry';
import { VisitEntryService } from '../visit-entry.service';
import { VistEntryAddComponent } from '../vist-entry-add/vist-entry-add.component';
import { VistEntryEditComponent } from '../vist-entry-edit/vist-entry-edit.component';
import { VistEntryStatusUpdateComponent } from '../vist-entry-status-update/vist-entry-status-update.component';

@Component({
  selector: 'app-vist-entry-list',
  templateUrl: './vist-entry-list.component.html',
  styleUrls: ['./vist-entry-list.component.css']
})
export class VistEntryListComponent implements OnInit  , AfterViewInit {
  displayedColumns: string[] = ['HospitalName', 'Date', 'FirstName', 'LastName', 'Serial',
                                 'Status', 'EditStatus', 'Action'];
  visitEntries: IVisitEntry[] = [];
  dataSource = new MatTableDataSource<IVisitEntry>(this.visitEntries);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private visitEntryService: VisitEntryService,
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
    const dialogBoxWithData = this.dialog.open(VistEntryAddComponent, {
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
      const dialogBoxWithData = this.dialog.open(VistEntryEditComponent, {
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
      const dialogBoxWithData = this.dialog.open(VistEntryStatusUpdateComponent, {
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

