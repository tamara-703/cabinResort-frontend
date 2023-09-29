import { Component } from '@angular/core';
import { GuestId, newUser } from '../dataFormat';
import { Password } from 'primeng/password';
import { UsersService } from '../users/services/users.service';
import { LogInService } from '../log-in/services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(
    private userService: UsersService,
    private logInService: LogInService,
    private router: Router) {
  }


  confirmPassword!: string;
  newUser: newUser = {
    username: "",
    password: "",
    email: "",
    phone: "",
    address: "",
    language: "ENG",
    role: "",
    last_name: "",
    first_name: ""
  };





  createUserValidate() {
    let create: Boolean = true;
    if (!(this.newUser.password == this.confirmPassword)) {
      console.log("pass no work")
      create = false;

    }

    this.newUser.email.toLowerCase();
    if (!(this.newUser.email.includes("@") &&
      (this.newUser.email.includes(".com") || this.newUser.email.includes(".net") || this.newUser.email.includes(".edu")))) {
      console.log("email no work")
      create = false;
    }

    if (this.newUser.username.toLowerCase() == "taken") {
      console.log("user no work")
      create = false;
    }

    if (this.newUser.username === "" ||
      this.newUser.password === "" ||
      this.newUser.first_name === "" ||
      this.newUser.last_name === "" ||
      this.newUser.email === "" ||
      this.newUser.phone === "" ||
      this.newUser.address === "") {
      console.log("blank");
    }

    if (create) {
      console.log("all good");
      this.createUser();
    }


  }


  createUser() {
    console.log("creating user");
    this.userService.addUser(this.newUser).subscribe(respnse => {
      console.log(this.newUser.password);
      console.log(this.newUser.username);
      sessionStorage.setItem('unencrypted pass', this.newUser.password)
      this.logInService.getUserInfo(this.newUser.username, this.newUser.password).subscribe(response => {
        let logIn:GuestId = response;
    
        console.log("After fetching" , logIn);
    
        if(response!= null)
        {
        
          sessionStorage.setItem('username',logIn.username)
          sessionStorage.setItem('password',logIn.password)
          sessionStorage.setItem('userId', String(logIn.id))
        }
      })
    
      setTimeout(() => {
    
        this.router.navigate(['users'])
    
      }, 2000);});
  }

}
