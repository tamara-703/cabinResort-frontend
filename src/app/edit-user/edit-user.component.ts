import { Component } from '@angular/core';
import { GuestId, newUser } from '../dataFormat';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'
import { UsersService } from '../users/services/users.service';
import { LogInService } from '../log-in/services/log-in.service';

interface StateLang {
  title: string;
  value: string;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  states: StateLang[] | any;
  selectedState: StateLang | any;
  languages: StateLang[] | any;
  selectedLanguage: StateLang | any;
  usernameTaken: Boolean = false;
  newUser: GuestId = {
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
    private userService: UsersService,
    private router: Router,
    private messageService: MessageService,
    private logInService: LogInService
  ) {
  }

  confirmPassword!: string;


  ngOnInit() {
    this.languages = [
      { title: 'English', value: 'ENG' },
      { title: 'Spanish', value: 'SPA' }
    ];
    this.states = [
      { title: "Alabama", value: "AL" },
      { title: "Alaska", value: "AK" },
      { title: "Arizona", value: "AZ" },
      { title: "Arkansas", value: "AR" },
      { title: "California", value: "CA" },
      { title: "Colorado", value: "CO" },
      { title: "Connecticut", value: "CT" },
      { title: "Delaware", value: "DE" },
      { title: "Florida", value: "FL" },
      { title: "Georgia", value: "GA" },
      { title: "Hawaii", value: "HI" },
      { title: "Idaho", value: "ID" },
      { title: "Illinois", value: "IL" },
      { title: "Indiana", value: "IN" },
      { title: "Iowa", value: "IA" },
      { title: "Kansas", value: "KS" },
      { title: "Kentucky", value: "KY" },
      { title: "Louisiana", value: "LA" },
      { title: "Maine", value: "ME" },
      { title: "Maryland", value: "MD" },
      { title: "Massachusetts", value: "MA" },
      { title: "Michigan", value: "MI" },
      { title: "Minnesota", value: "MN" },
      { title: "Mississippi", value: "MS" },
      { title: "Missouri", value: "MO" },
      { title: "Montana", value: "MT" },
      { title: "Nebraska", value: "NE" },
      { title: "Nevada", value: "NV" },
      { title: "New Hampshire", value: "NH" },
      { title: "New Jersey", value: "NJ" },
      { title: "New Mexico", value: "NM" },
      { title: "New York", value: "NY" },
      { title: "North Carolina", value: "NC" },
      { title: "North Dakota", value: "ND" },
      { title: "Ohio", value: "OH" },
      { title: "Oklahoma", value: "OK" },
      { title: "Oregon", value: "OR" },
      { title: "Pennsylvania", value: "PA" },
      { title: "Rhode Island", value: "RI" },
      { title: "South Carolina", value: "SC" },
      { title: "South Dakota", value: "SD" },
      { title: "Tennessee", value: "TN" },
      { title: "Texas", value: "TX" },
      { title: "Utah", value: "UT" },
      { title: "Vermont", value: "VT" },
      { title: "Virginia", value: "VA" },
      { title: "Washington", value: "WA" },
      { title: "West Virginia", value: "WV" },
      { title: "Wisconsin", value: "WI" },
      { title: "Wyoming", value: "WY" }
    ];


    if (sessionStorage.getItem("userId") != null) {
      let userId = sessionStorage.getItem("userId");
      this.logInService.getUserById(userId).subscribe(response => {
        console.log(response)
        this.newUser = response
        this.newUser.password = sessionStorage.getItem("unencryptedPass") || "";
        this.confirmPassword = this.newUser.password;

      });
    }

  }


  updateUserValidate() {
    let create: Boolean = true;
    this.usernameTaken = false;
    let loggedInUser: GuestId;
    console.log(this.newUser.username);
    this.userService.getUsername(this.newUser.username).subscribe(response => {
      loggedInUser = response
      if (loggedInUser != null) {
          this.messageService.add({ severity: 'error', summary: 'Username Taken', detail: 'This Username Is Taken' });
          create = false;
      }

      if (!(this.newUser.password == this.confirmPassword)) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Password', detail: 'Passwords Must Match' });
        create = false;

      }

      this.newUser.email.toLowerCase();
      if (!(this.newUser.email.includes("@") &&
        (this.newUser.email.includes(".com") || this.newUser.email.includes(".net") || this.newUser.email.includes(".edu")))) {
        this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Provided Email Is Invalid' });
        create = false;
      }




      if (this.newUser.username === "" ||
        this.newUser.password === "" ||
        this.newUser.first_name === "" ||
        this.newUser.last_name === "" ||
        this.newUser.email === "" ||
        this.newUser.phone === "" ||
        this.newUser.address === ""
        || this.selectedState == null) {
        create = false;
        this.messageService.add({ severity: 'error', summary: 'Blank Field', detail: 'No Fields May Remain Blank' });
      }


      if (create) {
       console.log("TODO actually update user");
      }

    }
    );

  }


}
