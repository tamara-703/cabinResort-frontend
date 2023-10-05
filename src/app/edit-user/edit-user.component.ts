import { Component } from '@angular/core';
import { GuestId, newUser } from '../dataFormat';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api'
import { UsersService } from '../users/services/users.service';
import { LogInService } from '../log-in/services/log-in.service';
import { TranslateService } from '@ngx-translate/core';

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

  languages: StateLang[] | any;
  selectedLanguage: StateLang | any;
  usernameTaken: Boolean = false;
  updateUser: GuestId = {
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
    private logInService: LogInService,
    private translateService: TranslateService
  ) {
  }

  confirmPassword!: string;


  ngOnInit() {

    let lang = sessionStorage.getItem('lang') || 'en';

    this.translateService.use(lang);

    //get user data by
    if (sessionStorage.getItem('username') == null) {
      this.router.navigate(['home']);
    }

    if(sessionStorage.getItem('lang') === 'ar')
    {
      this.languages = [
        { title: 'انجليزي', value: 'en' },
        { title: 'عربي', value: 'ar' }
      ];
    } else {
      this.languages = [
        { title: 'English', value: 'en' },
        { title: 'Arabic', value: 'ar' }
      ];
    }

    if (sessionStorage.getItem("userId") != null) {
      let userId = sessionStorage.getItem("userId");
      this.logInService.getUserById(userId).subscribe(response => {
        this.updateUser = response
        this.updateUser.password = sessionStorage.getItem("unencryptedPass") || "";
        this.confirmPassword = this.updateUser.password;
      });
    }

  }


  updateUserValidate() {

    let update: Boolean = true;
    if (!(this.updateUser.password == this.confirmPassword)) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Password', detail: 'Passwords Must Match' });
      update = false;

    }

    this.updateUser.email.toLowerCase();
    if (!(this.updateUser.email.includes("@") &&
      (this.updateUser.email.includes(".com") || this.updateUser.email.includes(".net") || this.updateUser.email.includes(".edu")))) {
      this.messageService.add({ severity: 'error', summary: 'Invalid Email', detail: 'Provided Email Is Invalid' });
      update = false;
    }




    if (
      this.updateUser.password === "" ||
      this.updateUser.first_name === "" ||
      this.updateUser.last_name === "" ||
      this.updateUser.email === "" ||
      this.updateUser.phone === "" ||
      this.updateUser.address === "") {
      update = false;
      this.messageService.add({ severity: 'error', summary: 'Blank Field', detail: 'No Fields May Remain Blank' });
    }


    if (update) {
      console.log("updating");
      this.updateUser.language = this.selectedLanguage.value;
      console.log(this.updateUser)
      this.userService.updateUser(this.updateUser, this.updateUser.id).subscribe(response => {
        console.log("update successful ", response);
        sessionStorage.setItem("password", response.password),
        sessionStorage.setItem('lang',response.language)
        sessionStorage.setItem("unencryptedPass", this.updateUser.password),
        this.messageService.add({ severity: 'success', summary: 'Account Updated', detail: 'Account Has Been Updated' });
        this.router.navigate(["/users"]);
      }

        );


    }

  }

  navigateToProfile()
  {
    this.router.navigate(['/users']);
  }


}
