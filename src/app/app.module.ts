import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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
    LogInComponent

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
    DropdownModule
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
