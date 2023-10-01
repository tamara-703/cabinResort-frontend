import { Component } from '@angular/core';
import { LogInService } from '../log-in/services/log-in.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GuestId } from '../dataFormat';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userId: number = Number(sessionStorage.getItem('userId'));
  cabinData: any;
  userData: GuestId = {
    id: 0,
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    language: "",
    role: "",
    enabled: false,
    last_name: "",
    first_name: "",
    authorities: [{ authority: "string" }],
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
  };


  constructor(private logInService: LogInService, private messageService: MessageService, private router: Router) {

  }


  ngOnInit(): void {
    //get user data by
    if(sessionStorage.getItem('username') != null)
    {
      this.logInService.getUserById(this.userId).subscribe(response => {
        this.userData = response;
        console.log("user data in user component ", this.userData);
      })
    }
  }

  logout()
  {
    if(sessionStorage.getItem('username') != null)
    {
      sessionStorage.clear();

      this.messageService.add({severity:'info',summary:'Log-Out',detail:'You Have Been Logged Out'});

      setTimeout(() => {

        this.router.navigate(['home']);

      }, 1000);
    }
  }
}
