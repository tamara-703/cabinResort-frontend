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

  constructor(private route: ActivatedRoute, private service: CabinsService) {

    route.params.subscribe(params => {
      this.idParam = params['id'];

      console.log("incoming param " , this.idParam);
    })

    service.getCabinById(this.idParam).subscribe(response => {
      console.log(response);
    })

  }

}
