import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinsService } from 'src/app/cabins/services/cabins.service';
import { ReserveService } from '../services/reserve.service';
import { Reservations } from 'src/app/users';
import { LogInService } from 'src/app/log-in/services/log-in.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  idParam: number = 0;
  reserveForm: FormGroup;
  userId: number = Number(sessionStorage.getItem('userId'));
  username: any = sessionStorage.getItem('username');
  password: any = sessionStorage.getItem('password');
  cabinData: any;
  userData: any;
  imgArray_1: string[] = [];
  img: string = "";
  firstImg: string = "";
  secondImg: string = "";
  thirdImg: string = "";
  fourthImg: string = "";
  fifthImg: string = "";
  checkIn: number = 0;
  checkOut: number = 0;
  isCheckoutValid: boolean = false;
  isReservationValid: boolean = false;
  value: number = Math.floor((Math.random() * 5 - 1 + 1) + 1);

  reservation: Reservations = {
    id: 0,
    reserved_cabin_id: {
      id: 0,
      sleeps: 0,
      price: 0,
      description: "",
      capacity: 0,
      cabin_name: "",
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
    pet_friendly: false
  },
  image_id: {
    id: 0,
  url: ""
  }
    },
    check_out: "",
    check_in: "",
    guest_id:
    {
      id: 0,
      username: "",
      password: "",
      email: "",
      phone: "",
      address: "",
      language: "",
      role: "",
      last_name: "",
      first_name: ""
    }
  }

  constructor(private route: ActivatedRoute,
              private cabinService: CabinsService,
              private router: Router,
              private reserveService: ReserveService,
              private logInService: LogInService,
              private messageService: MessageService,
              private formBuilder: FormBuilder) {
    //getting param id (cabin id)
    this.route.params.subscribe(params => {
      this.idParam = params['id'];

      console.log("incoming param " , this.idParam);
    })

    //form control
    this.reserveForm = this.formBuilder.group({
      checkIn: ["", Validators.required],
      checkOut: ["", Validators.required]
    })

    this.cabinService.getCabinById(this.idParam).subscribe(response => {
      this.cabinData = response;

      console.log("cabin data in reserve component " , this.cabinData);

      this.img = this.cabinData.image_id.url;
      this.imgArray_1 = this.img.split(",");

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

    })

    //get user data by
    this.logInService.getUserById(this.userId).subscribe(response => {
      this.userData = response;
      console.log("user data in reserve component " , this.userData);
    })

              }

  ngOnInit(): void {


  }

  reserve()
  {
    if(this.checkOut < this.checkIn)
    {
      this.isCheckoutValid = true;
    }

    console.log("In reserve")
    console.log("check in: ", this.checkIn, " check out: ", this.checkOut)

    this.reservation = {
      id: 0,
    reserved_cabin_id: {
      id: this.cabinData.id,
      sleeps: this.cabinData.sleeps,
      price: this.cabinData.price,
      description: this.cabinData.description,
      capacity: this.cabinData.capacity,
      cabin_name: this.cabinData.cabin_name,
      no_rooms: this.cabinData.no_rooms,
      no_bathrooms: this.cabinData.no_bathrooms,
      amenities_id: {
      id: this.cabinData.amenities_id.id,
    patio: this.cabinData.amenities_id.patio,
    fireplace: this.cabinData.amenities_id.fireplace,
    kitchen: this.cabinData.amenities_id.kitchen,
    jacuzzi: this.cabinData.amenities_id.jacuzzi,
    outdoor_hot_shower: this.cabinData.amenities_id.outdoor_hot_shower,
    outdoor_furniture: this.cabinData.amenities_id.outdoor_furniture,
    pet_friendly: this.cabinData.amenities_id.pet_friendly
  },
  image_id: {
    id: this.cabinData.image_id.id,
  url: this.cabinData.image_id.image_urls
  }
    },
    check_out: String(this.checkOut),
    check_in: String(this.checkIn),
    guest_id:
    {
      id: this.userId,
      username: this.username,
      password: this.password,
      email: this.userData.email,
      phone: this.userData.phone,
      address: this.userData.address,
      language: this.userData.language,
      role: this.userData.role,
      last_name: this.userData.last_name,
      first_name: this.userData.first_name
    }

    }

    // this.reserveService.createReservation(this.reservation).subscribe(response => {
    //   console.log("create success!")
    //   this.isReservationValid = true;
    //   const severity = 'success';


    //   setTimeout(() => {
    //     this.isReservationValid = false;
    //     this.messageService.add({severity:severity,summary:'Success',detail:'Reservation was a success'});
    // }, 2000);

    // setTimeout(() => {
    //   this.router.navigate(['users']);
    // },5000)


    // })
  }

  cancel()
  {
    this.router.navigate(['home']);
  }


}
