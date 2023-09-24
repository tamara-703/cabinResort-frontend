import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CabinsComponent } from './cabins/cabins.component';
import { UsersComponent } from './users/users.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { LogInComponent } from './log-in/log-in.component';
import { DialogModule } from 'primeng/dialog';
import { LogInService } from './log-in/services/log-in.service';
import { UsersService } from './users/services/users.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ReserveComponent } from './reserves/reserve/reserve.component';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';

const initializeAppFactory = (primeConfig: PrimeNGConfig) => () => {
      // ......
      primeConfig.ripple = true;
    };


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CabinsComponent,
    UsersComponent,
    LogInComponent,
    ReserveComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    FormsModule,
    HttpClientModule,
    DropdownModule,
    PasswordModule,
    RatingModule,
    CardModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: {
      APP_INITIALIZER,
      HTTP_INTERCEPTORS
    },
    useFactory: initializeAppFactory,
    deps: [PrimeNGConfig],
    multi: true
 },
 LogInService,
 UsersService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
