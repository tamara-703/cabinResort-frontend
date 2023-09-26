import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visible: boolean = false;

  constructor(private router: Router){

  }

  showDialog() {
    if (sessionStorage.getItem("username")) {
      this.router.navigate(["/users"]);
    } 
    else {
      this.visible = true;
    }


  }
}
