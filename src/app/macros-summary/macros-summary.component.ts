import { Component, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-macros-summary',
  templateUrl: './macros-summary.component.html',
  styleUrls: ['./macros-summary.component.css']
})
export class MacrosSummaryComponent implements OnInit {
  // toppings = new FormControl();
  // toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  dropdownList : any;
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  Difining_Macro = 0 ;
  Difining_Macro_Variables = 0;
  Macro_Fun_Eval= 0;
  Macro_Gender_Called = 0;
  Macro_Gender_Defined = 0 ;
  Macro_Let_Called = 0;
  Macro_Sort_Defined = 0;
  Macro_sort_called = 0;

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

      this.Difining_Macro = response.data['Difining_Macro'];
      this.Difining_Macro_Variables = response.data['Difining_Macro_Variables'];
      this.Macro_Fun_Eval= response.data['Macro_Fun_Eval'];
      this.Macro_Gender_Called = response.data['Macro_Gender_Called'];
      this.Macro_Gender_Defined = response.data['Macro_Gender_Defined'];
      this.Macro_Let_Called = response.data['Macro_Let_Called'];  
      this.Macro_Sort_Defined = response.data['Macro_Sort_Defined'];  
      this.Macro_sort_called = response.data['Macro_sort_called'];
      // this.dropdownList = response['data'];
      // console.log(this.dropdownList)
      
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
