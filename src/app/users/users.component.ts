import { Component } from '@angular/core';
import { LogInService } from '../log-in/services/log-in.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userId: number = Number(sessionStorage.getItem('userId'));
  cabinData: any;
  userData: any;


  constructor(private logInService: LogInService) { 

  }


  ngOnInit(): void {
    //get user data by
    this.logInService.getUserById(this.userId).subscribe(response => {
      this.userData = response;
      console.log("user data in reserve component ", this.userData);
    })
  }
}
