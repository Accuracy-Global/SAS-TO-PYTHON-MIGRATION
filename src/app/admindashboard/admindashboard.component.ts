import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  constructor() { }
  @ViewChild('mychart') mychart;
  canvas: any;
  ctx: any;
  public chart: Chart;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      
      data: {
        datasets: [{
          label: 'Week',
          backgroundColor: "rgba(255, 99, 132,0.4)",
          borderColor: "rgb(255, 99, 132)",
          fill: true,
          data: [
            { x: 1, y: 2 },
            { x: 2, y: 2.5 },
            { x: 3, y: 5 },
            { x: 4, y: 4.75 },
            { x: 5, y: 4.75 },
            { x: 6, y: 6 },
            { x: 7, y: 9 },
            { x: 8, y: 6 },
          ],
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Sheduler Chart'
        },
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              userCallback: function (tick) {
                // if (tick >= 1000) {
                //   return (tick / 1000).toString() + 'km';
                // }
                return tick.toString() + ' Week';
              }
            },
            scaleLabel: {
              labelString: 'Weeks',
              display: true,
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              userCallback: function (tick) {
                return tick.toString() + 'm';
              }
            },
            scaleLabel: {
              labelString: 'Task',
              display: true
            }
          }]
        }
      }
    });
  }
  ngOnInit(): void {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
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
