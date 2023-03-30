import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummarystaticsComponent } from './summarystatics/summarystatics.component';
import { MacrosSummaryComponent } from './macros-summary/macros-summary.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { DatastepStatementsComponent } from './datastep-statements/datastep-statements.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'converter', component:ConverterComponent},
  {path:'login', component:LoginComponent},
  {path:'Registration', component:RegistrationComponent},
  {path:'reportdashboard', component:AdmindashboardComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'summarystatics', component:SummarystaticsComponent},
  {path:'macrossummary', component:MacrosSummaryComponent},
  {path:'procedures', component:ProceduresComponent},
  {path:'datastepstatements', component:DatastepStatementsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
