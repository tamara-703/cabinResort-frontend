import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LogInService } from './services/log-in.service';
import { GuestId, Authority} from '../users';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit, OnDestroy {
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
  private service: LogInService,
  private appComponent: AppComponent
){}



ngOnInit(): void {

  // this.service.getUserInfo().subscribe(response => {
  //   console.log(response)
  //   this.logIn = response;


  //   console.log("After fetching" , this.logIn);
  // })

}


logInUser(){
  console.log("invoked");
  this.service.getUserInfo().subscribe(response => {
    this.logIn = response;

    console.log("After fetching" , this.logIn);

    if(this.logIn.id != 0)
    {
      this.appComponent.visible = false;
    }
  })

}

logOutUser()
{
  localStorage.clear();
  //reload page
}


ngOnDestroy(): void {

}


}
