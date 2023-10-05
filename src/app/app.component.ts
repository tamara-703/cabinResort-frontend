import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogInService } from './log-in/services/log-in.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  visible: boolean = false;
  supportedLanguages = ['en', 'ar'];
  selectedLang: string;
  lang: string = 'en';

  constructor(
    private router: Router,
    public logInService: LogInService,
    private translateService: TranslateService
  ) {
    this.translateService.addLangs(this.supportedLanguages);

    if (sessionStorage.getItem('lang') != '') {
      let lang = sessionStorage.getItem('lang') || 'en';
      this.selectedLang = lang;
      this.translateService.setDefaultLang(lang);
      this.translateService.use(lang);
    } else {
      this.selectedLang = 'en';
      const browserLang = this.translateService.getBrowserLang() || 'en';
      this.translateService.use(browserLang);
    }
  }

  ngOnInit(): void {
    this.visible = this.logInService.visible;
    let lang = sessionStorage.getItem('lang');
  }

  //log in dialog visability
  showDialog() {
    if (sessionStorage.getItem('username')) {
      this.router.navigate(['/users']);
    } else {
      this.logInService.visible = true;
    }
  }

  selectLang(event: Event) {
    const lang = (event.target as HTMLSelectElement).value;
    sessionStorage.setItem('lang', lang);
    this.translateService.use(lang);
    window.location.reload();
  }
}
