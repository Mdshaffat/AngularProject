import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'HospitalCliant';

  constructor(private accountService: AccountService, private router: Router) {}
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  loadCurrentUser() {
    const token = localStorage.getItem('hotpital_user_token');
    this.accountService.loadCurrentUser(token).subscribe(() => {
      console.log('loaded user');
    }, error => {
      console.log(error);
    });
  }
}
