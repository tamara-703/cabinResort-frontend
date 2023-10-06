import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewResevationsService } from '../view-reservations/services/view-resevations.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Reservations } from '../dataFormat';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.css'],
})
export class EditReservationComponent implements OnInit {
  paramId: any;
  reservationData: Reservations = {
    id: 0,
    reserved_cabin_id: {
      id: 0,
      sleeps: 0,
      price: 0,
      description: '',
      capacity: 0,
      cabin_name: '',
      cabinNameAr: '',
      cabinloc: {
        stateId: '',
        address: '',
        city: '',
        cityAr: '',
        zip: ''
      },
      no_rooms: 0,
      no_bathrooms: 0,
      amenities_id: {
        id: 0,
        patio: false,
        fireplace: false,
        kitchen: false,
        jacuzzi: false,
        outdoor_hot_shower: false,
        outdoor_furniture: false,
        pet_friendly: false,
      },
      image_id: {
        id: 0,
        url: '',
      },
    },
    check_out: '',
    check_in: '',
    guest_id: {
      id: 0,
      username: '',
      password: '',
      email: '',
      phone: '',
      address: '',
      language: '',
      role: '',
      last_name: '',
      first_name: '',
    },
  };
  imgArray: string[] = [];
  firstImg: string = '';
  displayedPhoto: string = '';
  calenderForm: FormGroup;
  guests: number = 0;
  isReservationValid: boolean = false;
  checkIn: number = 0;
  checkOut: number = 0;

  constructor(
    private params: ActivatedRoute,
    private rsvpService: ViewResevationsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private reservationService: ViewResevationsService,
    private messageService: MessageService
  ) {
    this.paramId = params.snapshot.paramMap.get('id');

    this.calenderForm = this.formBuilder.group({
      checkIn: new FormControl(0, Validators.required),
      checkOut: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.rsvpService.getRsvpById(this.paramId).subscribe((response) => {
      this.reservationData = response;

      this.checkIn = Number(this.reservationData.check_in);
      this.checkOut = Number(this.reservationData.check_out);



      if(sessionStorage.getItem('lang') === 'ar')
      {
        this.reservationData.reserved_cabin_id.cabin_name = this.reservationData.reserved_cabin_id.cabinNameAr;

      }

      console.log(this.reservationData);

      this.firstImg = this.reservationData.reserved_cabin_id.image_id.url;

      this.imgArray = this.firstImg.split(',');

      console.log(this.imgArray);

      this.displayedPhoto = this.imgArray[0];
    });
  }

  updateReserve() {
    console.log('before sending ', this.reservationData);
    console.log('before sending ', this.paramId);
    console.log('check in ', this.checkIn, ' check out ', this.checkOut);

    this.reservationData.check_in = String(this.checkIn);
    this.reservationData.check_out = String(this.checkOut);

    this.reservationService
      .updateRsvp(this.paramId, this.reservationData)
      .subscribe((response) => {
        this.reservationData = response;

        console.log('updated ', this.reservationData);
        this.isReservationValid = true;
      });

    setTimeout(() => {
      this.isReservationValid = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Reservation updated successfully',
      });
    }, 2000);

    setTimeout(() => {
      this.router.navigate(['users']);
    }, 5000);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
