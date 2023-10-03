import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CabinsComponent } from './cabins/cabins.component';
import { UsersComponent } from './users/users.component';
import { ReserveComponent } from './reserves/reserve/reserve.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ExternalRedirectComponent } from './external-redirect/external-redirect.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewReservationsComponent } from './view-reservations/view-reservations.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cabins', component: CabinsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reserve/:id', component: ReserveComponent},
  { path: 'newUser', component: CreateUserComponent},
  { path: 'external-redirect', component: ExternalRedirectComponent},
  { path: 'editAccount', component: EditUserComponent},
  { path: 'reservations', component: ViewReservationsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
