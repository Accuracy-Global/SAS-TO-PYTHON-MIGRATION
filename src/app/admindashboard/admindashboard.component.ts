import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
// import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Chart, ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
// import { Label, BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit { 

  Total_script= 0 ;
  complex_script= 0 ;
  medium_script= 0 ;
  simple_script= 0 ;

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService, 
    @Inject(Router) private router: Router
  ) { 
    

  }
  // @ViewChild('mychart') mychart;
  // canvas: any;
  // canvas1: any;
  // ctx: any;
  public chart: Chart;
  // public schedular_chart: Chart;
 
  ngAfterViewInit() {
    // this.canvas = this.mychart.nativeElement;
    // this.canvas1 = this.mychart.nativeElement; 
    // this.ctx = this.canvas.getContext('2d');

    // let myChart = new Chart("canvas_schedular_chart", {
    //   type: "bar",
    //   data: {
    //     labels: ["Total Script", "Simple Script", "Complex Script", "medium Script"],
    //     datasets: [
    //       {
    //         label: "# of Scripts",
    //         data: [12, 19, 3, 5],
    //         backgroundColor: "rgba(255, 99, 132,0.4)",
    //         borderColor: "rgb(255, 99, 132)",
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  }
  ngOnInit(): void {
    this.Getpwactstable();

    

    

    
  }

//   "data": {
//     "Total_script": 6,
//     "simple_script": 2
//     "complex_script": 2,
//     "medium_script": 2,
// },
  Getpwactstable() {

    let data = []

    this.httpService.getAssesmentgraph(data).subscribe(response => {

      console.log(response['data']);

      this.Total_script= response.data['Total_script'];
      this.complex_script= response.data['complex_script'];
      this.medium_script= response.data['medium_script'];
      this.simple_script= response.data['simple_script'];
      this.plotGraph();
      // console.log(this.Total_script);

    });
  }

  plotGraph() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Total Script", "Simple Script", "Complex Script", "medium Script"],
        datasets: [
          {
            label: "# of Scripts",
            data: [this.Total_script, this.simple_script, this.complex_script, this.medium_script],
            backgroundColor: "rgba(255, 99, 132,0.4)",
            borderColor: "rgb(255, 99, 132)",
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }


}
