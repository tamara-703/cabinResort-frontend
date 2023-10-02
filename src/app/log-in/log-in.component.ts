import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; //form validation
import { LogInService } from './services/log-in.service';
import { GuestId, Authority } from '../dataFormat';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnDestroy {
  logIn: GuestId = {
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





  constructor(
    private service: LogInService,
    private router: Router,
    private messageService: MessageService
  ) { }



  logInUser() {
    if (this.logIn.username && this.logIn.password) {
      console.log("username ", this.logIn.username, " password ", this.logIn.password)
      sessionStorage.setItem('unencrypted pass', this.logIn.password)
      this.service.getUserInfo(this.logIn.username, this.logIn.password).subscribe(response => {
        this.logIn = response;

        console.log("After fetching", this.logIn);

        if (this.logIn.id != 0) {
          this.service.visible = false;
          sessionStorage.setItem('username', this.logIn.username);
          sessionStorage.setItem('password', this.logIn.password);
          sessionStorage.setItem('userId', String(this.logIn.id))
          //this.router.navigate(['users'])
          this.messageService.add({ severity: 'success', summary: 'Log-In Successful', detail: 'You Sucessfully logged in!' });
        }
        else {
          this.messageService.add({ severity: 'error', summary: 'Invalid Credentials', detail: 'Check To See If Username and Password Are Correct' });

        }
      })
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Invalid Credentials', detail: 'Must Provide A Username and Password' });
    }
  }

  ngOnDestroy(): void {

  }


  createUser() {
    this.service.visible = false;
    this.logIn.username = "";
    this.logIn.password = ""
    this.router.navigate(["/newUser"]);
  }
}
