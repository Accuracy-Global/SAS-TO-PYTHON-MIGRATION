import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;

  constructor( 
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
    @Inject(Router) private router: Router
  ) { }

  // get f() { return this.loginform.controls; }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  loginFormSubmit(model: FormGroup) {
    // debugger;
    // model.value.sas = this.sas;
    // model.value.python = this.python;

    const formData = new FormData();
    formData.append('email', model.value.email);
    formData.append('password', model.value.password);
    

    this.httpService.postApplogin(formData).subscribe(response => {
      
      console.log(response);
      if (response.status == true) {
        swal.fire(
          'Success',
          'Login Successfully',
          'success'
        )
        // this.spinner.hide();
        this.router.navigate(["converter"]);
      } else {
        // this.spinner.hide();
        swal.fire(
          'Not Success',
          'Login Failed',
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
