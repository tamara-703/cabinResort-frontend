import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CabinsComponent } from './cabins/cabins.component';
import { UsersComponent } from './users/users.component';
import { ReserveComponent } from './reserves/reserve/reserve.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'cabins', component: CabinsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reserve/:id', component: ReserveComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
