import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinsService } from 'src/app/cabins/services/cabins.service';
import { ReserveService } from '../services/reserve.service';
import { Cabin, Reservations } from 'src/app/dataFormat';
import { LogInService } from 'src/app/log-in/services/log-in.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css'],
})
export class ReserveComponent implements OnInit {
  errorMessage(errorMessage: any) {
    throw new Error('Method not implemented.');
  }
  //variables for reserving a cabin
  idParam: string = '';
  userId: number = Number(sessionStorage.getItem('userId'));
  username: any = sessionStorage.getItem('username');
  password: any = sessionStorage.getItem('password');
  cabinData: Cabin = {
    id: 0,
    sleeps: 0,
    price: 0,
    description: '',
    descAr: '',
    capacity: 0,
    cabinloc: {
      stateId: '',
      address: '',
      city: '',
      cityAr: '',
      zip: '',
    },
    cabin_name: '',
    cabinNameAr: '',
    image_id: {
      id: 0,
      url: '',
    },
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
    no_rooms: 0,
    no_bathrooms: 0,
  };
  userData: any;
  imgArray_1: string[] = [];
  img: string = '';
  firstImg: string = '';
  secondImg: string = '';
  thirdImg: string = '';
  fourthImg: string = '';
  fifthImg: string = '';
  checkIn: number = 0;
  checkOut: number = 0;
  isCheckoutValid: boolean = false;
  isReservationValid: boolean = false;
  date: Date = new Date();
  today: number = Number(this.date.getTime());
  calenderForm: FormGroup;
  guests: number = 0;
  value: number = Math.floor(Math.random() * 5 - 1 + 1 + 1);

  reservation: Reservations = {
    id: 0,
    reserved_cabin_id: {
      id: 0,
      sleeps: 0,
      price: 0,
      description: '',
      capacity: 0,
      cabin_name: '',
      cabinNameAr: '',
      no_rooms: 0,
      no_bathrooms: 0,
      cabinloc: {
        stateId: '',
        address: '',
        city: '',
        cityAr: '',
        zip: '',
      },
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
  cabin_name: undefined;

  constructor(
    private route: ActivatedRoute,
    private cabinService: CabinsService,
    private router: Router,
    private reserveService: ReserveService,
    private logInService: LogInService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.calenderForm = this.formBuilder.group({
      checkIn: new FormControl(0, Validators.required),
      checkOut: [0, Validators.required],
    });

    this.idParam = this.route.snapshot.paramMap.get('id') ?? '';

    this.cabinService.getCabinById(this.idParam).subscribe((response) => {
      this.cabinData = response;

      let selectedLang = sessionStorage.getItem('lang');

      if (selectedLang === 'ar') {
        this.cabinData.cabin_name = this.cabinData.cabinNameAr;
        this.cabinData.description = this.cabinData.descAr;
        this.cabinData.cabinloc.city = this.cabinData.cabinloc.cityAr;

      }

      this.img = this.cabinData.image_id.url;
      this.imgArray_1 = this.img.split(',');

      this.firstImg = this.imgArray_1[0];

      this.imgArray_1.shift();

      this.secondImg = this.imgArray_1[0];
      this.imgArray_1.shift(); //removed second image

      this.thirdImg = this.imgArray_1[0];
      this.imgArray_1.shift(); // removed third image

      this.fourthImg = this.imgArray_1[0];
      this.imgArray_1.shift();

      this.fifthImg = this.imgArray_1[0];
      this.imgArray_1.shift();
    });

    //get user data by
    this.logInService.getUserById(this.userId).subscribe((response) => {
      this.userData = response;
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('username') == null) {
      this.router.navigate(['home']);
    }
  }

  /*purpose: this function is to reserve a cabin for the user */
  reserve() {

    this.reservation = {
      id: 0,
      reserved_cabin_id: {
        id: this.cabinData.id,
        sleeps: this.cabinData.sleeps,
        price: this.cabinData.price,
        description: this.cabinData.description,
        capacity: this.cabinData.capacity,
        cabin_name: this.cabinData.cabin_name,
        cabinNameAr: this.cabinData.cabinNameAr,
        no_rooms: this.cabinData.no_rooms,
        no_bathrooms: this.cabinData.no_bathrooms,
        cabinloc: {
          stateId: this.cabinData.cabinloc.stateId,
          address: this.cabinData.cabinloc.address,
          city: this.cabinData.cabinloc.city,
          cityAr: this.cabinData.cabinloc.cityAr,
          zip: this.cabinData.cabinloc.zip,
        },
        amenities_id: {
          id: this.cabinData.amenities_id.id,
          patio: this.cabinData.amenities_id.patio,
          fireplace: this.cabinData.amenities_id.fireplace,
          kitchen: this.cabinData.amenities_id.kitchen,
          jacuzzi: this.cabinData.amenities_id.jacuzzi,
          outdoor_hot_shower: this.cabinData.amenities_id.outdoor_hot_shower,
          outdoor_furniture: this.cabinData.amenities_id.outdoor_furniture,
          pet_friendly: this.cabinData.amenities_id.pet_friendly,
        },
        image_id: {
          id: this.cabinData.image_id.id,
          url: this.cabinData.image_id.url,
        },
      },
      check_out: String(this.checkOut),
      check_in: String(this.checkIn),
      guest_id: {
        id: this.userId,
        username: this.username,
        password: this.password,
        email: this.userData.email,
        phone: this.userData.phone,
        address: this.userData.address,
        language: this.userData.language,
        role: this.userData.role,
        last_name: this.userData.last_name,
        first_name: this.userData.first_name,
      },
    };

    this.isCheckoutValid = this.reserveService.createReservation(
      this.reservation
    );
    this.isReservationValid = true;

    const severity = 'success';

    setTimeout(() => {
      this.isReservationValid = false;
      this.messageService.add({
        severity: severity,
        summary: 'Success',
        detail: 'Reservation was a success',
      });
    }, 2000);

    setTimeout(() => {
      this.router.navigate(['users']);
    }, 5000);
  }

  //returns to home
  cancel() {
    this.router.navigate(['home']);
  }
}
