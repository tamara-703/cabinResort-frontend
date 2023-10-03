import { Component, OnInit } from '@angular/core';
import { ViewResevationsService } from './services/view-resevations.service';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {

  userReservations: any;
  cabinData: any;

  constructor(private reservationsService: ViewResevationsService) { }


  ngOnInit(): void {
    if(sessionStorage.getItem('userId') != null)
    {
      const username = sessionStorage.getItem('username') ?? "";
      this.reservationsService.getAllReservationsByUserName(username).subscribe(response => {
        this.userReservations = response;

        console.log("RSVP data " , this.userReservations)

        this.reservationsService.getCabinById(this.userReservations.id).subscribe(resp => {
          console.log("Cabin data " , resp);
        })
      })
    }
  }

}
