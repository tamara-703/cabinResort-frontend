import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinsService } from 'src/app/cabins/services/cabins.service';
import { ReserveService } from '../services/reserve.service';
import { GuestId, Reservations } from 'src/app/users';
import { LogInService } from 'src/app/log-in/services/log-in.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  idParam: number = 0;
  userId: number = Number(sessionStorage.getItem('userId'));
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
  value: number = Math.floor((Math.random() * 5 - 1 + 1) + 1);

  // reservation: Reservations = {
  //   id: 0,
  //   reserved_cabin_id: {
  //     id: 0,
  // sleeps: 0,
  // price: 0,
  // description: "",
  // capacity: 0,
  // cabin_name: "",
  // no_rooms: 0,
  // no_bathrooms: 0,
  // amenities_id: {
  //   id: 0,
  //   patio: false,
  //   fireplace: false,
  //   kitchen: false,
  //   jacuzzi: false,
  //   outdoor_hot_shower: false,
  //   outdoor_furniture: false,
  //   pet_friendly: false
  // },
  // image_id: {
  //   id: 0,
  // url: ""
  // }
  //   },
  //   check_out: "",
  //   check_in: "",
  //   guest_id:
  //   {
  //     id: 0,
  //     username: "",
  //     password: "",
  //     email: "",
  //     phone: "",
  //     address: "",
  //     language: "",
  //     role: "",
  //     enabled: true,
  //     last_name: "",
  //     first_name: "",
  //     authorities: Authority[{
  //       authority: ""
  //     }]
  //     accountNonExpired: boolean
  //     accountNonLocked: boolean
  //     credentialsNonExpired: boolean
  //   }
  // }

  constructor(private route: ActivatedRoute,
              private cabinService: CabinsService,
              private router: Router,
              private reserveService: ReserveService,
              private logInService: LogInService) {

    route.params.subscribe(params => {
      this.idParam = params['id'];

      console.log("incoming param " , this.idParam);
    })

    cabinService.getCabinById(this.idParam).subscribe(response => {
      this.cabinData = response;

      console.log(this.cabinData);

      this.img = this.cabinData.image_id.url;
      this.imgArray_1 = this.img.split(",");
      console.log(this.imgArray_1.length);
      this.firstImg = this.imgArray_1[0];
      console.log(this.firstImg)
      this.imgArray_1.shift();
      console.log(this.imgArray_1.length) //removed first image
      this.secondImg = this.imgArray_1[0];
      this.imgArray_1.shift(); //removed second image

      this.thirdImg = this.imgArray_1[0];
      this.imgArray_1.shift(); // removed third image

      this.fourthImg = this.imgArray_1[0];
      this.imgArray_1.shift();

      this.fifthImg = this.imgArray_1[0];
      this.imgArray_1.shift();

    })

  }

  //tried to get user info on init, but it gave me 401. It's not recognizing a user is logged in. How can we fix that?
  ngOnInit(): void {
    this.logInService.getUser().subscribe(data => {
      this.userData = data;

      console.log(this.userData);
    })
  }

  reserve()
  {
    if(this.checkOut < this.checkIn)
    {
      this.isCheckoutValid = true;
    }



  }

  cancel()
  {
    this.router.navigate(['home']);
  }


}
