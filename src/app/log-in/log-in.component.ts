import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LogInService } from './services/log-in.service';
import { GuestId, LogIn, Authority} from '../users';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
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
    authorities: [{authority: "string"}],
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
  };


constructor(
  private service: LogInService
){}

logInUser(){
  this.service.getUser().subscribe(
    (response) => {
      console.log(response);
      this.logIn=response
    }
  );
}


}
