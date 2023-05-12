import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
// import { Label, BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit { 

  constructor() { 
    

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
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Total Script", "Simple Script", "Complex Script", "medium Script"],
        datasets: [
          {
            label: "# of Scripts",
            data: [12, 19, 3, 5],
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
