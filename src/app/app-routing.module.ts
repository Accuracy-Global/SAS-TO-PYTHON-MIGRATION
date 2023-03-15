import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';


const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'converter', component:ConverterComponent},
  {path:'login', component:LoginComponent},
  {path:'dashboard', component:AdmindashboardComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
