import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  // proc sort data=data;
  // by descending age income;
  // run;


  //   proc import datafile='cars.csv'
  // out=data
  // dbms =csv
  // replace;
  // run;
  convertform: FormGroup;
  @Input() activeTheme = 'vs';
  @Input() readOnly = false;
  code : any;
  sascode: [];
  pythoncode:[];

  sas:any;
  python:any;
  isShowpythoncodeeditor = true;
  isShowpythoncode= false;
  isShowTerminalsas = false;
  isShowTerminalpython = false;

  theme = 'vs-dark';

  codeModel = {
    language: "typescript",
    uri: "main.ts",
    value:  [
      
    ].join('\n'),
};

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    }
  };

  onCodeChanged(value) {
    console.log('CODE', value);
  }

  constructor( 
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
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

  downloadsas() {
    var blob = new Blob([this.sas], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "code.sas7bdat");

  }
  downloadpython() {
    var blob = new Blob([this.python], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "code.py");

  }
  showTerminalsas(){
    this.isShowTerminalsas = true;

     const formData = new FormData();
     formData.append('args', this.sas);
    // formData.append('python', this.python);
     this.httpService.postAppRunOutputsas(formData).subscribe(response => {

       console.log(response);
       this.sascode = response['data'];
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
  showTerminalpython(){
    this.isShowTerminalpython = true;

     const formData = new FormData();
     // formData.append('args', this.sas);
     formData.append('args', this.codeModel.value);
    this.httpService.postAppRunOutputpython(formData).subscribe(response => {

       console.log(response);
       this.pythoncode = response['data'];
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
  showEditorpython(){
    this.isShowpythoncodeeditor = true;
    this.isShowpythoncode = false;
  }
  showcodepython(){
    this.isShowpythoncodeeditor = false;
    this.isShowpythoncode = true;
  }
  converterFormSubmit(model: FormGroup) {
    // this.spinner.show();
    this.showcodepython();
      this.codeModel.value = '';
    model.value.sas = this.sas;
    model.value.python = this.python;

    const formData = new FormData();
    formData.append('args', this.sas);
    // formData.append('python', this.python);
    this.httpService.postAppconvert(formData).subscribe(response => {
      
      console.log(response);
      // let input = response['data'];
      // let output = input.replace(/<[^>]+>/g, '');
      // console.log(output);
      this.codeModel.value = response['data'];
      // this.codeModel.value = `import pandas as pd \n data = pd.read_csv('cars.csv')`
      console.log("this.codeModel ============ ", this.codeModel);
      // this.code = response['data'];
      // this.codeModel.value = output;
      // this.isShowpythoncodeeditor = false;
      // this.isShowpythoncode = true;
      this.showEditorpython();
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

  // runOutputsas() {

  //   const formData = new FormData();
  //   formData.append('args', this.sas);
  //   // formData.append('python', this.python);
  //   this.httpService.postAppRunOutputsas(formData).subscribe(response => {

  //     console.log(response);
  //   },
  //   error => {
  //     if (error.status === 403) {
  //       // this.spinner.hide();
  //       swal.fire(
  //         'Not Success',
  //         'Failed',
  //         'error'
  //       )
  //     }
  //   });
    
  // }

  // runOutputpython() {
  //   // this.spinner.show();
  //   const formData = new FormData();
  //   // formData.append('args', this.sas);
  //   formData.append('python', this.python);
  //   this.httpService.postAppRunOutputpython(formData).subscribe(response => {

  //     console.log(response);
  //   },
  //   error => {
  //     if (error.status === 403) {
  //       // this.spinner.hide();
  //       swal.fire(
  //         'Not Success',
  //         'Failed',
  //         'error'
  //       )
  //     }
  //   });
    
  // }



}
