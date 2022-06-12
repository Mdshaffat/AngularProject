import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from 'src/app/core/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit , AfterViewInit {
  title = 'User List';
  footerName = 'Data';
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'MobileNumber', 'Designation', 'HospitalName', 'Role', 'CreatedOn', 'Active', 'Action'];
  users: IUser[] = [];
  dataSource = new MatTableDataSource<IUser>(this.users);
  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.getusers();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getusers(){
    this.userService.getAllUser().subscribe(response => {
      this.users = response;
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
