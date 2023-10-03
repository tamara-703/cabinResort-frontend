import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in/services/log-in.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  visible: boolean = false;

  //inject the login service
  constructor(private router: Router, public logInService: LogInService){
  }

  ngOnInit(): void {
    this.visible = this.logInService.visible;
  }

  showDialog() {
    if (sessionStorage.getItem("username")) {
      this.router.navigate(["/users"]);
    }
    else {
      this.logInService.visible = true;
    }
  }

  goToMap()
  {
    const mapUrl = "https://docs.google.com/document/d/1CAQQKi9EDjrKf02PvAolcRQahTlcXtlJij0wii06XyY/edit?usp=sharing";

    this.router.navigate(['/external-redirect'], {
      queryParams: {mapUrl},
      skipLocationChange: true
    })
  }
}
