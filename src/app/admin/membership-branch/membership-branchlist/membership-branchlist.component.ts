import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IBranch } from 'src/app/core/models/MembershipBranch/branch';
import { MembershipBranchService } from '../membership-branch.service';

@Component({
  selector: 'app-membership-branchlist',
  templateUrl: './membership-branchlist.component.html',
  styleUrls: ['./membership-branchlist.component.css']
})
export class MembershipBranchlistComponent implements OnInit , AfterViewInit {
  title = 'Branch List';
  footerName = 'Data';
  displayedColumns: string[] = ['code', 'Name', 'Address', 'Upazila', 'District', 'Active', 'Action'];
  branches: IBranch[] = [];
  dataSource = new MatTableDataSource<IBranch>(this.branches);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private branchService: MembershipBranchService) { }
  ngOnInit(): void {
    this.getBranchList();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getBranchList(){
    this.branchService.getAllBranches().subscribe(response => {
      this.branches = response;
      this.dataSource.data = response;
    }, error => {
      console.log(error);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
