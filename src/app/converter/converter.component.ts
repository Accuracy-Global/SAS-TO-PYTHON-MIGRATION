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
  sasmultiplefile = [];

  sasFileName = "";
  sasFileArr = [];

  sas:any;
  python:any;
  formData = new FormData();
  isShowpythoncodeeditor = true;
  isShowpythoncode= false;
  isShowsascodeeditor = true;
  isShowsascode= false;
  isShowTerminalsas = false;
  isShowTerminalpython = false;

  theme = 'vs-dark';

  codeModel = {
    language: "typescript",
    uri: "main.ts",
    value:  [
      
    ].join('\n'),

  };
  

  codeModelsas = {
    language: "typescript",
    uri: "main1.ts",
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
  

  multiplefilesas(event) {

    if (event.target.files.length > 0) {
      this.sasmultiplefile = event.target.files;
      console.log(this.sasmultiplefile, "file")
      // console.log(event.target.files[0], "file name");

      this.sasFileName = event.target.files[0].name;
      this.sasFileArr = this.sasFileName.split('.'); 
    this.sasFileName = this.sasFileArr[0]; 
    console.log("this.fileName = ", this.sasFileName);
      // localStorage.setItem("filename", this.sasFileName);
      // const formData = new FormData();
      for (let file of this.sasmultiplefile) {
       
        this.formData.append('file', file);
      }
    }

  } 

  showTerminalsas(){
    this.isShowTerminalsas = true;

     const formData = new FormData();
     formData.append('args', this.sas);
    // formData.append('python', this.python);
     this.httpService.postAppRunOutputsas(formData).subscribe(response => {

       console.log(response);
       this.sascode = response['Data'];
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
       this.pythoncode = response['Data'];
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
  showEditorsas(){
    this.isShowsascodeeditor = true;
    this.isShowsascode = false;
  }
  showcodesas(){
    this.isShowsascodeeditor = false;
    this.isShowsascode = true;
  }
  converterFormSubmit(model: FormGroup) {
    // this.spinner.show();
    this.showcodepython();
      this.codeModel.value = '';
    model.value.sas = this.codeModel.value;
    model.value.python = this.codeModel.value;

    const formData = new FormData();
    formData.append('ProcCodes', this.codeModelsas.value);
    // formData.append('python', this.python);
    this.httpService.postAppconvert(formData).subscribe(response => {
      
      console.log(response);
      // let input = response['data'];
      // let output = input.replace(/<[^>]+>/g, '');
      // console.log(output);
      this.codeModel.value = response['Data'];
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

  sasfileupload() {
    // const formData = new FormData();
    // for (let file of this.sasmultiplefile) {
       
    //   formData.append('file', file);
    // }
    this.showcodesas();

    this.codeModelsas.value = '';
    this.httpService.postsasfileupload(this.formData).subscribe(response => {
      
      console.log(response);
       this.codeModelsas.value = response['Data'];
       console.log("this.codeModelsas ============ ", this.codeModelsas);
       this.showEditorsas();
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

  downloadpython() {
    // var filename = localStorage.getItem("filename")
    var blob = new Blob([this.codeModel.value], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, this.sasFileName+".py");

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
