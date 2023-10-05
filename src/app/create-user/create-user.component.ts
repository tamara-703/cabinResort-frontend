import { Component } from '@angular/core';
import { GuestId, State, newUser } from '../dataFormat';
import { Password } from 'primeng/password';
import { UsersService } from '../users/services/users.service';
import { LogInService } from '../log-in/services/log-in.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

interface StateLang {
  title: string;
  value: string;
}


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  constructor(
    private userService: UsersService,
    private logInService: LogInService,
    private router: Router,
    private messageService: MessageService) {
  }
  //Sets up variables for creating a user
  //StateLang is for state and Language updating. State would be implemented in future update
  languages: StateLang[] | any;
  selectedLanguage: StateLang | any;
  usernameTaken: Boolean = false;

  ngOnInit() {
    //sets llanguage
    if(sessionStorage.getItem('lang') === 'ar')
    {
      this.languages = [
        { title: 'انجليزي', value: 'en' },
        { title: 'عربي', value: 'ar' }
      ];
    } else
    {
      this.languages = [
        { title: 'English', value: 'en' },
        { title: 'Arabic', value: 'ar' }
      ];
    }
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
  }




  /*purpose: validates a valid user for creation  */
  createUserValidate() {
    let create: Boolean = true;
    this.usernameTaken = false;
    let loggedInUser: GuestId;
    this.userService.getUsername(this.newUser.username).subscribe(response => {
      loggedInUser = response
      //checks if username is taken
      if (loggedInUser != null) {
          this.messageService.add({ severity: 'error', summary: 'Username Taken', detail: 'This Username Is Taken' });
          create = false;
      }

      //check to see if passwords match
      if (!(this.newUser.password == this.confirmPassword)) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Password', detail: 'Passwords Must Match' });
        create = false;

      }
      //validates if email is correct format
      this.newUser.email.toLowerCase();
      if (!(this.newUser.email.includes("@") &&
        (this.newUser.email.includes(".com") || this.newUser.email.includes(".net") || this.newUser.email.includes(".edu")))) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Provided Email Is Invalid' });
        create = false;
      }

      //makes sure no blank input
      if (this.newUser.username === "" ||
        this.newUser.password === "" ||
        this.newUser.first_name === "" ||
        this.newUser.last_name === "" ||
        this.newUser.email === "" ||
        this.newUser.phone === "" ||
        this.newUser.address === "") {
        create = false;
        this.messageService.add({ severity: 'error', summary: 'Blank Field', detail: 'No Fields May Remain Blank' });
      }

      //if valid user then calls create
      if (create) {
        this.createUser();
      }

    }
    );

  }


    /*purpose: this function creates user and logs them in  */
  createUser() {

    this.newUser.language = this.selectedLanguage.value;

    this.userService.addUser(this.newUser).subscribe(respnse => {
      sessionStorage.setItem('unencryptedPass', this.newUser.password)
      this.logInService.getUserInfo(this.newUser.username, this.newUser.password).subscribe(response => {
        let logIn: GuestId = response;

        if (response != null) {
          this.messageService.add({ severity: 'success', summary: 'Account Created', detail: 'Your Account Was Sucessfuly Created' });
          sessionStorage.setItem('username', logIn.username)
          sessionStorage.setItem('password', logIn.password)
          sessionStorage.setItem('userId', String(logIn.id))
          sessionStorage.setItem('lang', this.newUser.language);
        }
      })

      setTimeout(() => {
        

        this.router.navigate(['users'])

      }, 2000);
    });
  }

}
