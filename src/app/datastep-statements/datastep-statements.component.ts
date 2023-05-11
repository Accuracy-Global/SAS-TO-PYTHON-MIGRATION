import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-datastep-statements',
  templateUrl: './datastep-statements.component.html',
  styleUrls: ['./datastep-statements.component.css']
})
export class DatastepStatementsComponent implements OnInit {

  dropdownList : any;
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  Array = 0;
  Drop = 0;
  Keep = 0;
  Rename = 0;
  Set = 0;
  Cross_join = 0;
  Full_Join = 0;
  Inner_Join = 0;
  Left_Join = 0;
  Right_Join = 0;
  Parameter = 0;
  Merge = 0;
  

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

      this.Array = response.data['Array'];
      this.Drop = response.data['Drop'];
      this.Keep = response.data['Keep'];
      this.Rename = response.data['Rename'];
      this.Set = response.data['Set'];
      this.Cross_join = response.data['Cross_join'];
      this.Full_Join = response.data['Full_Join'];
      this.Inner_Join = response.data['Inner_Join'];
      this.Left_Join = response.data['Left_Join'];
      this.Right_Join = response.data['Right_Join'];
      this.Parameter = response.data['Parameter'];
      this.Merge = response.data['Merge'];
      
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
