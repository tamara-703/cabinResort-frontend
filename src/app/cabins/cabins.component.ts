import { Component, OnInit } from '@angular/core';
import { CabinsService } from './services/cabins.service';
import { Cabinlocation, State } from '../users';


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


  constructor(private service: CabinsService) {}


  ngOnInit(): void {

    // try{
    // this.service.getAllCabins().subscribe(response => {

    //   this.cabinData = response;
    //   this.populateCabinOptions();


    // })}
    // catch(error)
    // {
    //   console.error("Data could not be loaded ", error);
    // }

    this.states = [
      {name: "Texas", code: "TX", flag: "https://cdn.britannica.com/51/4651-004-B1024BD2/flags-Texas-independence-motif-flag-Mexico-star-1845.jpg"},
      {name: "Pennsylvania", code: "PA", flag: "https://higherusa.com/pub/media/catalog/product//p/e/pennsylvania-flag.jpg"},
      {name: "Ohio", code: "OH", flag: "https://static.vecteezy.com/system/resources/previews/002/492/652/original/ohio-officially-flag-free-vector.jpg"},
      {name: "North Carolina", code: "NC", flag: "https://cdn.britannica.com/85/3085-004-29C93A89/design-independence-Union-flag-convention-state-North-April-12-1776.jpg"},
      {name: "California", code: "CA", flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Flag_of_California.svg/800px-Flag_of_California.svg.png"},
    ]

  }

  // populateCabinOptions()
  // {
  //   console.log("Loading data into method " , this.cabinData);

  //   if(this.cabinData != null)
  //   {
  //     for(let i = 0; i < this.cabinData.length; i++)
  //     {
  //       this.cabinOptions[i] = {
  //         stateId: this.cabinData[i].cabinloc.stateId,
  //         address: this.cabinData[i].cabinloc.address,
  //         city: this.cabinData[i].cabinloc.city,
  //         zip: this.cabinData[i].cabinloc.zip
  //       }
  //     }
  //   }

  // }

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

}
