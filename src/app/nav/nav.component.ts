import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  lang: string = '';

  ngOnInit(): void {
    this.lang = sessionStorage.getItem('language') || 'en';
  }

  changeLang(event: Event)
  {
    const lang = (event.target as HTMLSelectElement).value;
    sessionStorage.setItem('language',lang);
    window.location.reload();

  }

}
