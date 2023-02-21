import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {

  convertform: FormGroup;
  @Input() activeTheme = 'vs';
  @Input() readOnly = false;

  sas:any;
  python:any;

  // dependencies: string[] = [
  //   '@types/node',
  //   '@ngstack/translate', 
  //   '@ngstack/code-editor'
  // ];

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  constructor( 
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
    // private spinner: NgxSpinnerService, 
    @Inject(Router) private router: Router
  ) { }

  get f() { return this.convertform.controls; }

  ngOnInit(): void {
    this.convertform = this.formBuilder.group({
      sas: [''],
      python: [''],
    });
   
  }

  onCodeChangedsas(value) {
    console.log(value);
    this.sas = value;
  }

  onCodeChangedpython(value) {
    console.log(value);
    this.python = value;
  }

  converterFormSubmit(model: FormGroup) {
    // this.spinner.show();
    model.value.sas = this.sas;
    // console.log(model.value.sas);
    model.value.python = this.python;
    // console.log(model.value.python);

    const formData = new FormData();
    formData.append('sas', this.sas);
    formData.append('python', this.python);
    
    this.httpService.postAppconvert(formData).subscribe(response => {
      
      // this.Getderpage();
      console.log(response);
      // this.spinner.hide();
      swal.fire(
        'Success',
        'Code converted Successfully',
        'success'
      )
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
