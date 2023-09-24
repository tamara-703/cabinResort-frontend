import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  imgArray_2: string[] = [];
  img: string = "";
  firstImg: string = "";
  secondImg: string = "";
  thirdImg: string = "";
  fourthImg: string = "";
  fifthImg: string = "";
  value: number = 5;

  constructor(private route: ActivatedRoute, private service: CabinsService) {

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


      // this.imgArray_2.push(this.imgArray_1[0]);
      // // console.log(this.imgArray_2)
      // this.imgArray_1.shift(); //removed second image
      // // console.log(this.imgArray_1)
      // this.imgArray_2.push(this.imgArray_1[0]);
      // this.imgArray_1.shift();

      // console.log(this.imgArray_1);
      // console.log(this.imgArray_2);

    })

  }

}
