import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/core/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  title = 'User Details';
userDetails: IUser;
id: any;
  constructor(private activateRoute: ActivatedRoute, private userService: UserService ) { }

  ngOnInit(): void {
    this.loaduser();
  }
  loaduser(){
    this.id = this.activateRoute.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe(response => {
      console.log(response);
      this.userDetails = response;
    }, error => {
      console.log(error);
    });
  }
}
