import { Component, OnInit } from '@angular/core';
import { CabinsService } from './services/cabins.service';
import { Cabinlocation, State } from '../dataFormat';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Cabin, CabinReserve } from '../dataFormat';
import { LogInService } from '../log-in/services/log-in.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-cabins',
  templateUrl: './cabins.component.html',
  styleUrls: ['./cabins.component.css'],
})
export class CabinsComponent implements OnInit {
  cabinData: any;
  images: string = '';
  firstImages: string[] = [];
  imgsArray: string[] = [];
  reserveCabins: any;

  cabinOptions: Cabinlocation[] = [];
  states: any | undefined;
  selectedState: State = {
    name: '',
    code: '',
    flag: '',
  };
  visibleData: boolean = false;
  isLogout: boolean = false;

  constructor(
    private service: CabinsService,
    private router: Router,
    private logInService: LogInService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    let lang = sessionStorage.getItem('lang') || 'en';
    this.translateService.use(lang);
    if(sessionStorage.getItem('lang') == 'ar')
    {

      this.states = [
        {
          name: 'تكساس',
          code: 'TX',
          flag: 'https://cdn.britannica.com/51/4651-004-B1024BD2/flags-Texas-independence-motif-flag-Mexico-star-1845.jpg',
        },
        {
          name: 'بنسلفانيا',
          code: 'PA',
          flag: 'https://higherusa.com/pub/media/catalog/product//p/e/pennsylvania-flag.jpg',
        },
        {
          name: 'أوهايو',
          code: 'OH',
          flag: 'https://static.vecteezy.com/system/resources/previews/002/492/652/original/ohio-officially-flag-free-vector.jpg',
        },
        {
          name: 'جورجيا',
          code: 'GA',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png',
        },
        {
          name: 'واشنطن',
          code: 'WA',
          flag: 'https://visionwear.com/wp-content/uploads/2011/09/9673_1_3_2.gif',
        },
      ];
    } else {
      this.states = [
        {
          name: 'Texas',
          code: 'TX',
          flag: 'https://cdn.britannica.com/51/4651-004-B1024BD2/flags-Texas-independence-motif-flag-Mexico-star-1845.jpg',
        },
        {
          name: 'Pennsylvania',
          code: 'PA',
          flag: 'https://higherusa.com/pub/media/catalog/product//p/e/pennsylvania-flag.jpg',
        },
        {
          name: 'Ohio',
          code: 'OH',
          flag: 'https://static.vecteezy.com/system/resources/previews/002/492/652/original/ohio-officially-flag-free-vector.jpg',
        },
        {
          name: 'Georgia',
          code: 'GA',
          flag: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png',
        },
        {
          name: 'Washington',
          code: 'WA',
          flag: 'https://visionwear.com/wp-content/uploads/2011/09/9673_1_3_2.gif',
        },
      ];
    }

  }

  getByStateId() {
    if (this.selectedState != null) {
      this.service
        .getCabinByStateId(this.selectedState.code)
        .subscribe((response) => {
          this.cabinData = response;

          console.log("cabin data " , this.cabinData);

          this.reserveCabins = this.getCabinForReserve(this.cabinData);

          this.visibleData = true;
        });
    }
  }

  getCabinForReserve(cabins: Cabin[]): CabinReserve[] {
    let tempCabin: CabinReserve;

    let tempCabins: CabinReserve[] = [];

    for (let cabin of cabins) {

      if (sessionStorage.getItem('lang') === 'ar') {
        let desc: string = '';
        let name: string = '';
        let city: string = '';

        name = cabin.cabinNameAr;
        desc = cabin.descAr;
        city = cabin.cabinloc.cityAr;

        cabin.cabinloc.city = city;

        this.imgsArray = cabin.image_id.url.split(',');

        tempCabin = {
          id: cabin.id,
          sleeps: cabin.sleeps,
          price: cabin.price,
          description: desc,
          capacity: cabin.capacity,
          cabinloc: cabin.cabinloc,
          cabin_name: name,
          image: this.imgsArray[0],
          amenities_id: cabin.amenities_id,
          no_rooms: cabin.no_rooms,
          no_bathrooms: cabin.no_bathrooms,
        };

        tempCabins.push(tempCabin);
      } else {
        this.imgsArray = cabin.image_id.url.split(',');

        tempCabin = {
          id: cabin.id,
          sleeps: cabin.sleeps,
          price: cabin.price,
          description: cabin.description,
          capacity: cabin.capacity,
          cabinloc: cabin.cabinloc,
          cabin_name: cabin.cabin_name,
          image: this.imgsArray[0],
          amenities_id: cabin.amenities_id,
          no_rooms: cabin.no_rooms,
          no_bathrooms: cabin.no_bathrooms,
        };

        tempCabins.push(tempCabin);
      }
    }

    console.log('reserve cabin data\n', tempCabins);

    return tempCabins;
  }

  navigateToReservePage(id: number) {
    if (sessionStorage.getItem('username') === null) {
      this.logInService.visible = true;
    } else {
      this.router.navigate([`reserve/${id}`]);
    }
  }
}
