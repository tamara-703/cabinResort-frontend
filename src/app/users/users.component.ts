import { Component } from '@angular/core';
import { LogInService } from '../log-in/services/log-in.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { GuestId } from '../dataFormat';
import { TranslateService } from '@ngx-translate/core';

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


  constructor(private logInService: LogInService, private messageService: MessageService, private router: Router, private translateService: TranslateService) {

  }


  ngOnInit(): void {

    let lang = sessionStorage.getItem('lang') || 'en';

    this.translateService.use(lang);


    if(sessionStorage.getItem('username') != null)
    {
      this.logInService.getUserById(this.userId).subscribe(response => {
        this.userData = response;
      })
    }else{
      this.router.navigate(['home']);
    }
  }

  /* logs user out and naviagtes bac home  */
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


  //navigates to edit user or edit reservations
  editUser(){
    this.router.navigate(['editAccount']);
  }

  navigateToReservations()
  {
    this.router.navigate(['/reservations']);
  }
}
