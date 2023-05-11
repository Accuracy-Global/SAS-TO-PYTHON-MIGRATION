import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-summarystatics',
  templateUrl: './summarystatics.component.html',
  styleUrls: ['./summarystatics.component.css']
})
export class SummarystaticsComponent implements OnInit {

  dropdownList : any;
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  No_of_sas_Variables= 0 ;
  No_of_macros= 0 ;
  No_of_procs= 0 ;
  No_Of_Lines= 0 ;
  No_Of_Proc_Sql= 0 ;
  No_Of_Datasteps= 0 ;
  No_Of_Statements= 0 ;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
    @Inject(Router) private router: Router
  ) { }

  ngOnInit(): void {
    this.getscriptlist();
    // this.dropdownList = [
    //   { item_id: 1, item_text: 'Mumbai' },
    //   { item_id: 2, item_text: 'Bangaluru' },
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' },
    //   { item_id: 5, item_text: 'New Delhi' }
    // ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: this.dropdownList,
      textField: this.dropdownList,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    let data = this.selectedItems;
    this.httpService.postAppgetscriptinfo(data).subscribe(response => {
      
      console.log(response);
      this.No_of_sas_Variables = response.data['No_of_sas_Variables'];
      this.No_of_macros = response.data['No_of_macros'];
      this.No_of_procs = response.data['No_of_procs'];
      this.No_Of_Lines = response.data['No_Of_Lines'];
      this.No_Of_Proc_Sql = response.data['No_Of_Proc_Sql'];
      this.No_Of_Datasteps = response.data['No_Of_Datasteps'];
      this.No_Of_Statements = response.data['No_Of_Statements'];
      
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
  onSelectAll(items: any) {
    console.log(items);
  }

  getscriptlist() {

    let data = {};
    var item_text;
    this.httpService.postAppgetscriptlist(data).subscribe(response => {
      
      console.log(response);
      this.dropdownList = response['data'];
      console.log(this.dropdownList)
      
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
