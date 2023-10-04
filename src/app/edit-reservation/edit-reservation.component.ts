import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewResevationsService } from '../view-reservations/services/view-resevations.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css']
})
export class EditReservationComponent implements OnInit {

  paramId: any;
  reservationData: any;
  imgArray: string[] = [];
  firstImg: string ="";
  displayedPhoto: string = "";
  calenderForm: FormGroup;
  guests: number = 0;
  isReservationValid: boolean = false;
  checkIn: number = 0;
  checkOut: number = 0;

  constructor(private params: ActivatedRoute, private rsvpService: ViewResevationsService, private formBuilder: FormBuilder,private router: Router, private reservationService: ViewResevationsService,private messageService: MessageService) {
    this.paramId = params.snapshot.paramMap.get('id');

    this.calenderForm = this.formBuilder.group(
      {
        'checkIn': new FormControl(0,Validators.required),
        'checkOut': [0,Validators.required]

      })

  }

  ngOnInit(): void {
    this.rsvpService.getRsvpById(this.paramId).subscribe(response => {
      this.reservationData = response;

      console.log(this.reservationData);

      this.firstImg = this.reservationData.reserved_cabin_id.image_id.url;

      this.imgArray = this.firstImg.split(",")

      console.log(this.imgArray)

      this.displayedPhoto = this.imgArray[0];


    })
  }

  updateReserve()
  {

    this.reservationService.updateRsvp(this.paramId,this.reservationData).subscribe(response => {

      this.reservationData = response;

      console.log("updated ", this.reservationData)
      this.isReservationValid = true;
    })

    setTimeout(() => {
      this.isReservationValid = false;
      this.messageService.add({severity:'success',summary:'Success',detail:'Reservation updated successfully'});
  }, 2000);

  setTimeout(() => {
    this.router.navigate(['users']);
  },5000)


  }

  cancel()
  {
    this.router.navigate(['/users'])
  }

}
