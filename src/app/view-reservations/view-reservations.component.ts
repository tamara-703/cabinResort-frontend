import { Component, OnInit } from '@angular/core';
import { ViewResevationsService } from './services/view-resevations.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-view-reservations',
  templateUrl: './view-reservations.component.html',
  styleUrls: ['./view-reservations.component.css']
})
export class ViewReservationsComponent implements OnInit {

  userReservations: any[] = [];
  cabinData: any;

  constructor(private reservationsService: ViewResevationsService, private router: Router, private messageService: MessageService) { }


  ngOnInit(): void {
    if(sessionStorage.getItem('userId') != null)
    {
      const username = sessionStorage.getItem('username') ?? "";
      this.reservationsService.getAllReservationsByUserName(username).subscribe(response => {
        this.userReservations = response;

        console.log("RSVP data " , this.userReservations)

      })
    }
  }

  editRsvp(rsvpId: number)
  {
    this.router.navigate([`editreserve/${rsvpId}`]);
  }

  deleteRsvp(rsvpId: number)
  {

    this.reservationsService.deleteRsvp(rsvpId);

    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Reservation was deleted',
      });
    }, 2000);

    setTimeout(() => {
      this.router.navigate(['users']);
    }, 5000);


  }

}
