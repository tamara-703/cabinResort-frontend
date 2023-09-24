import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CabinsService } from 'src/app/cabins/services/cabins.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent {

  idParam: number = 0;
  cabinData: any;
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

  constructor(private route: ActivatedRoute, private service: CabinsService, private router: Router) {

    route.params.subscribe(params => {
      this.idParam = params['id'];

      console.log("incoming param " , this.idParam);
    })

    service.getCabinById(this.idParam).subscribe(response => {
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

  reserve()
  {
    if(this.checkOut < this.checkIn)
    {
      this.isCheckoutValid = true;
    }
    console.log("check in " , this.checkIn);

    console.log("check out ", this.checkOut);

    
  }

  cancel()
  {
    this.router.navigate(['home']);
  }


}
