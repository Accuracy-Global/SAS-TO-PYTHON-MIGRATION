import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterComponent } from './converter/converter.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path:'', redirectTo:'converter', pathMatch:'full'},
  {path:'converter', component:ConverterComponent},
  {path:'login', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
