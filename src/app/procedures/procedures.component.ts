import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-procedures',
  templateUrl: './procedures.component.html',
  styleUrls: ['./procedures.component.css']
})
export class ProceduresComponent implements OnInit {

  dropdownList : any;
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  Proc_Means = 0 ;
  Proc_Sorts = 0 ;
  Proc_Printto = 0 ;
  Macro = 0 ;
  Proc_Transpose = 0 ;
  Proc_Correlation = 0 ;
  Proc_Freq = 0 ;
  Proc_Contexts = 0 ;
  Proc_Univariant = 0 ;
  Proc = 0 ;

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

      this.Proc_Means = response.data['Proc_Means'];
      this.Proc_Sorts = response.data['Proc_Sorts'];
      this.Proc_Printto = response.data['Proc_Printto'];
      this.Macro = response.data['Macro'];
      this.Proc_Transpose = response.data['Proc_Transpose'];
      this.Proc_Correlation = response.data['Proc_Correlation'];
      this.Proc_Freq = response.data['Proc_Freq'];
      this.Proc_Contexts = response.data['Proc_Contexts'];
      this.Proc_Univariant = response.data['Proc_Univariant'];
      this.Proc = response.data['Proc'];
      
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
