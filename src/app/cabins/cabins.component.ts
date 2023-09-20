import { Component, OnInit } from '@angular/core';
import { CabinsService } from './services/cabins.service';

@Component({
  selector: 'app-cabins',
  templateUrl: './cabins.component.html',
  styleUrls: ['./cabins.component.css']
})
export class CabinsComponent implements OnInit{

  //TODO : implement a search bar to get cabin by zipcode or stateid

  cabinData: any;

  constructor(private service: CabinsService) {}


  ngOnInit(): void {
    this.service.getCabinByStateId("TX").subscribe(response => {
      this.cabinData = response;

      console.log(this.cabinData);
    })
  }

  getByStateId(stateId: string)
  {
    //implement fetch by state id
  }

}
