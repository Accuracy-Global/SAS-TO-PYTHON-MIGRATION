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

  convertform: FormGroup;
  @Input() activeTheme = 'vs';
  @Input() readOnly = false;

  sas:any;
  python:any;
  isShowTerminalsas = false;
  isShowTerminalpython = false;

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

  downloadsas() {
    // var pdfUrl = Url;
    // console.log(pdfUrl);
    // //const pdfName = 'your_pdf_file';
    // FileSaver.saveAs(pdfUrl, pdfName);
    var blob = new Blob([this.sas], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "code.sas7bdat");

  }
  downloadpython() {
    // var pdfUrl = Url;
    // console.log(pdfUrl);
    // //const pdfName = 'your_pdf_file';
    // FileSaver.saveAs(pdfUrl, pdfName);
    var blob = new Blob([this.python], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, "code.py");

  }
  showTerminalsas(){
    this.isShowTerminalsas = true;
  }
  showTerminalpython(){
    this.isShowTerminalpython = true;
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
