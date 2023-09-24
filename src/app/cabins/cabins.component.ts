import { Component, OnInit } from '@angular/core';
import { CabinsService } from './services/cabins.service';
import { Cabinlocation, State } from '../users';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-cabins',
  templateUrl: './cabins.component.html',
  styleUrls: ['./cabins.component.css']
})
export class CabinsComponent implements OnInit{

  cabinData: any[] = [];

  cabinOptions: Cabinlocation[] = [];
  states: any | undefined;
  selectedState: State = {
    name: "",
    code: "",
    flag: ""
  }
  visibleData: boolean = false;


  constructor(private service: CabinsService, private router: Router, private appComponent: AppComponent) {}


  ngOnInit(): void {

    this.states = [
      {name: "Texas", code: "TX", flag: "https://cdn.britannica.com/51/4651-004-B1024BD2/flags-Texas-independence-motif-flag-Mexico-star-1845.jpg"},
      {name: "Pennsylvania", code: "PA", flag: "https://higherusa.com/pub/media/catalog/product//p/e/pennsylvania-flag.jpg"},
      {name: "Ohio", code: "OH", flag: "https://static.vecteezy.com/system/resources/previews/002/492/652/original/ohio-officially-flag-free-vector.jpg"},
      {name: "Georgia", code: "GA", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Flag_of_Georgia_%28U.S._state%29.svg/1200px-Flag_of_Georgia_%28U.S._state%29.svg.png"},
      {name: "Washington", code: "WA", flag: "https://visionwear.com/wp-content/uploads/2011/09/9673_1_3_2.gif"},
    ]

  }

  getByStateId()
  {

    if(this.selectedState != null)
    {
      this.service.getCabinByStateId(this.selectedState.code).subscribe(response => {

        this.cabinData = response;

        console.log(this.cabinData);

        this.visibleData = true;
      })
    }
  }

  navigateToReservePage(id: number)
  {
    if(localStorage.getItem("username") === null)
    {
      this.appComponent.visible = true;

    } else
    {
      this.router.navigate([`reserve/${id}`]);
    }
  }


  clearStorage()
  {
    localStorage.clear();
  }

}
