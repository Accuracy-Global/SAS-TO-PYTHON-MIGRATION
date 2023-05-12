import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { CodeEditorModule } from '@ngstack/code-editor';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { ConverterComponent } from './converter/converter.component';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummarystaticsComponent } from './summarystatics/summarystatics.component';
import { MacrosSummaryComponent } from './macros-summary/macros-summary.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { DatastepStatementsComponent } from './datastep-statements/datastep-statements.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    LoginComponent,
    AdmindashboardComponent,
    RegistrationComponent,
    DashboardComponent,
    SummarystaticsComponent,
    MacrosSummaryComponent,
    ProceduresComponent,
    DatastepStatementsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    CodeEditorModule.forRoot(),
    MonacoEditorModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
