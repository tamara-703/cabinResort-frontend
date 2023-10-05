import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CabinsComponent } from './cabins/cabins.component';
import { UsersComponent } from './users/users.component';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { LogInComponent } from './log-in/log-in.component';
import { DialogModule } from 'primeng/dialog';
import { LogInService } from './log-in/services/log-in.service';
import { UsersService } from './users/services/users.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { ReserveComponent } from './reserves/reserve/reserve.component';
import { PasswordModule } from 'primeng/password';
import { RatingModule } from 'primeng/rating';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { CreateUserComponent } from './create-user/create-user.component';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MatIconModule } from '@angular/material/icon';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';
import { NavComponent } from './nav/nav.component';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableModule } from 'primeng/table';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';


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
    ReserveComponent,
    CreateUserComponent,
    EditUserComponent,
    ViewReservationsComponent,
    NavComponent,
    EditReservationComponent

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
    TableModule,
    RatingModule,
    CardModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    InputTextModule,
    NoopAnimationsModule,
    InputNumberModule,
    MatIconModule,
    OverlayPanelModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: (http:HttpClient) => {return new TranslateHttpLoader(http,'./assets/i18n/','.json')},
          deps: [HttpClient]
        }
      }
    )
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
 UsersService,
 MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
