import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerform: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
    @Inject(Router) private router: Router
  ) { }

  // get f() { return this.loginform.controls; }

  ngOnInit(): void {
    this.registerform = this.formBuilder.group({
      email: [''],
      password: [''],
      username: [''],
      contact: [''],
      country: [''],
    });
  }

  registerFormSubmit(model: FormGroup) {
    // debugger;
    // model.value.sas = this.sas;
    // model.value.python = this.python;

    const formData = new FormData();
    formData.append('email', model.value.email);
    formData.append('password', model.value.password);
    formData.append('username', model.value.username);
    formData.append('contact', model.value.contact);
    formData.append('country', model.value.country);
    

    this.httpService.postAppregister(formData).subscribe(response => {
      
      console.log(response);
      if (response.status == true) {
        swal.fire(
          'Success',
          'Register Successfully',
          'success'
        )
        // this.spinner.hide();
        this.router.navigate(["login"]);
      } else {
        // this.spinner.hide();
        swal.fire(
          'Not Success',
          'Register Failed',
          'error'
        )
      }
      // status
      // swal.fire(
      //   'Success',
      //   'Login Successfully',
      //   'success'
      // )
      // // this.spinner.hide();
      // this.router.navigate(["converter"]);
      
    },
    error => {
      if (error.status === 403) {
        // this.spinner.hide();
        swal.fire(
          'Not Success',
          'Failed',
          'error'
        )
      }
    });
    
  }

}
