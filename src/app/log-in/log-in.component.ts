import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'; //form validation
import { LogInService } from './services/log-in.service';
import { GuestId, Authority} from '../users';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';

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
    authorities: [{authority: "string"}],
    accountNonExpired: false,
    accountNonLocked: false,
    credentialsNonExpired: false,
  };


  @Output() userInfo = new EventEmitter<GuestId>();


constructor(
  private service: LogInService,
  private appComponent: AppComponent
){}



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


sendOutUserInfo()
{
  if(this.logIn.id != 0)
  {
    this.userInfo.emit(this.logIn);
  }
}

logOutUser()
{
  localStorage.clear();
  //reload page
}


ngOnDestroy(): void {

}


}
