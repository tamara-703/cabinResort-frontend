import { Component, Output } from '@angular/core';
import { GuestId } from './users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cabin-resort';
  visible: boolean = false;

  

  showDialog() {
    this.visible = true;
}



}
