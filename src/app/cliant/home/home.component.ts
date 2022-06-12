import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import Chart from 'chart.js/auto';
import { HomePageReport } from 'src/app/core/models/Report/homepagereport';
import { Plugins } from 'protractor/built/plugins';
import { IUserNameAndPatientCount } from 'src/app/core/models/homepagepopup/userNameAndPaientCount';
import { MatDialog } from '@angular/material/dialog';
import { FrontDialogComponent } from 'src/app/Shared/component/front-dialog/front-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // currentMonthPatient
  chart: Chart;
  currentMonthPatientRecord: HomePageReport;
  cmpntmonthName: string;
  cmpnttotalData: number;
  cmpntcount: number[] = [];
  cmpntdate: string[] = [];
  // *******END*******

  // previousMonthPatient
  previousMonthPatientchart: Chart;
  previousMonthPatientRecord: HomePageReport;
  patientPreviousmonthName: string;
  previousMonthPatienttotalData: number;
  previousMonthPatientcount: number[] = [];
  previousMonthPatientdate: string[] = [];
  // *******END*******

  // currentMonthPrescription
  currentMonthPrescriptionchart: Chart;
  currentPrescriptionRecord: HomePageReport;
  prescriptionCurrentmonthName: string;
  currentPrescriptiontotalData: number;
  currentMonthPrescriptioncount: number[] = [];
  currentMonthPrescriptiondate: string[] = [];
  // *******END*******

  // previousMonthPrescription
  previousMonthPrescriptionchart: Chart;
  previousMonthPrescriptionRecord: HomePageReport;
  prescriptionPreviousMonthName: string;
  previousMonthPrescriptiontotalData: number;
  previousMonthPrescriptioncount: number[] = [];
  previousMonthPrescriptiondate: string[] = [];
  // *******END*******
  currentUserInfo: IUserNameAndPatientCount;

  // greeting
     myDate = new Date();
     hrs = this.myDate.getHours();
     greet;

  /////////////////////////
  constructor(private homeService: HomeService, public dialog: MatDialog) {
    if (this.hrs < 12)
      this.greet = 'Good Morning';
    else if (this.hrs >= 12 && this.hrs <= 17)
      this.greet = 'Good Afternoon';
    else if (this.hrs >= 17 && this.hrs <= 24)
      this.greet = 'Good Evening';

    this.getCurrentMontPrescriptionReport();
    this.getCurrentMontPatientReport();
    this.getPreviousMontPatientReport();
    this.getPreviounMonthPrescriptionReport();
   }

  ngOnInit(): void {
    this.getCurrentUserReport();
  }


  getCurrentMontPatientReport() {
    // int chart Data
    this.cmpntcount = [];
    this.cmpntdate = [];
    this.cmpntmonthName = '';
    this.cmpnttotalData = 0;
    if (this.chart) {
      this.chart.destroy();
    }

    this.homeService.getCurrentMonthPatientReport().subscribe(response => {
        this.currentMonthPatientRecord = response;
        this.cmpntmonthName = response.monthName;
        this.cmpnttotalData = response.totalData;
        // Implement Chart Data
        response.weeklyDataCounts.forEach((res) => {
          this.cmpntcount.push(res.count);
          this.cmpntdate.push(res.lastDate);
        });
        this.chart = new Chart('ctx', {
          type: 'line',
          data: {
              labels: this.cmpntdate,
              datasets: [
                {
                  // barPercentage: 0.5,
                  label: `Month:(${this.cmpntmonthName}) - Total Patient: (${this.cmpnttotalData})`,
                  data: this.cmpntcount,
                  fill: false,
                  borderColor: 'rgb(54, 49, 228)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderWidth: 3
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            scales: {
              x: {
                // position: 'top',
                stacked: true,
                ticks: {
                  maxRotation: 180,
                  minRotation: 90
                },
             },
              y: {
                display: true,
                stacked: true,
                min: 0,
                max: 1500,
                ticks: {
                  stepSize: 20,
                 },
             },

            },
          }
      });
        this.chart.update();
  }, error => {
        console.log(error);
      });
  }
  getPreviousMontPatientReport() {
    // int chart Data
    this.previousMonthPatientcount = [];
    this.previousMonthPatientdate = [];
    this.patientPreviousmonthName = '';
    this.previousMonthPatienttotalData = 0;
    if (this.previousMonthPatientchart) {
      this.previousMonthPatientchart.destroy();
    }

    this.homeService.getPreviousMonthPatientReport().subscribe(response => {
        this.previousMonthPatientRecord = response;
        this.patientPreviousmonthName = response.monthName;
        this.previousMonthPatienttotalData = response.totalData;
        // Implement Chart Data
        response.weeklyDataCounts.forEach((res) => {
          this.previousMonthPatientcount.push(res.count);
          this.previousMonthPatientdate.push(res.lastDate);
        });
        this.previousMonthPatientchart = new Chart('ctx2', {
          type: 'line',
          data: {
              labels: this.previousMonthPatientdate,
              datasets: [
                {
                  // barPercentage: 0.5,
                  label: `Month:(${this.patientPreviousmonthName}) - Total Patient: (${this.previousMonthPatienttotalData})`,
                  data: this.previousMonthPatientcount,
                  fill: false,
                  borderColor: 'rgb(100, 217, 233)',
                  backgroundColor: 'rgba(118, 91, 86, 0.2)',
                  borderWidth: 3
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            scales: {
              x: {
                // position: 'top',
                stacked: true,
                ticks: {
                  maxRotation: 180,
                  minRotation: 90
                },
             },
              y: {
                display: true,
                stacked: true,
                min: 0,
                max: 1500,
                ticks: {
                  stepSize: 20,
                 },
             },

            },
          }
      });
        this.previousMonthPatientchart.update();
  }, error => {
        console.log(error);
      });
  }
  getCurrentMontPrescriptionReport() {
    // int chart Data
    this.currentMonthPrescriptioncount = [];
    this.currentMonthPrescriptiondate = [];
    this.prescriptionCurrentmonthName = '';
    this.currentPrescriptiontotalData = 0;
    if (this.currentMonthPrescriptionchart) {
      this.currentMonthPrescriptionchart.destroy();
    }

    this.homeService.getCurrentMonthPrescriptionReport().subscribe(response => {
        this.currentPrescriptionRecord = response;
        this.prescriptionCurrentmonthName = response.monthName;
        this.currentPrescriptiontotalData = response.totalData;
        // Implement Chart Data
        response.weeklyDataCounts.forEach((res) => {
          this.currentMonthPrescriptioncount.push(res.count);
          this.currentMonthPrescriptiondate.push(res.lastDate);
        });
        this.currentMonthPrescriptionchart = new Chart('ctx3', {
          type: 'line',
          data: {
              labels: this.currentMonthPrescriptiondate,
              datasets: [
                {
                  // barPercentage: 0.5,
                  label: `Month:(${this.prescriptionCurrentmonthName}) - Total Prescription: (${this.currentPrescriptiontotalData})`,
                  data: this.currentMonthPrescriptioncount,
                  fill: false,
                  borderColor: 'rgb(245, 88, 142)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderWidth: 3
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            scales: {
              x: {
                // position: 'top',
                stacked: true,
                ticks: {
                  maxRotation: 180,
                  minRotation: 90
                },
             },
              y: {
                display: true,
                stacked: true,
                min: 0,
                max: 1500,
                ticks: {
                  stepSize: 20,
                 },
             },

            },
          }
      });
        this.currentMonthPrescriptionchart.update();
  }, error => {
        console.log(error);
      });
  }
  getPreviounMonthPrescriptionReport() {
    // int chart Data
    this.previousMonthPrescriptioncount = [];
    this.previousMonthPrescriptiondate = [];
    this.prescriptionPreviousMonthName = '';
    this.previousMonthPrescriptiontotalData = 0;
    if (this.previousMonthPrescriptionchart) {
      this.previousMonthPrescriptionchart.destroy();
    }

    this.homeService.getPreviousMonthPrescriptionReport().subscribe(response => {
        this.previousMonthPrescriptionRecord = response;
        this.prescriptionPreviousMonthName = response.monthName;
        this.previousMonthPrescriptiontotalData = response.totalData;
        // Implement Chart Data
        response.weeklyDataCounts.forEach((res) => {
          this.previousMonthPrescriptioncount.push(res.count);
          this.previousMonthPrescriptiondate.push(res.lastDate);
        });
        this.previousMonthPrescriptionchart = new Chart('ctx4', {
          type: 'line',
          data: {
              labels: this.previousMonthPrescriptiondate,
              datasets: [
                {
                  // barPercentage: 0.5,
                  label: `Month:(${this.prescriptionPreviousMonthName}) - Total Prescription: (${this.previousMonthPrescriptiontotalData})`,
                  data: this.previousMonthPrescriptioncount,
                  fill: false,
                  borderColor: 'rgb(75, 192, 192)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderWidth: 3
              },
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'x',
            scales: {
              x: {
                // position: 'top',
                stacked: true,
                ticks: {
                  maxRotation: 180,
                  minRotation: 90
                },
             },
              y: {
                display: true,
                stacked: true,
                min: 0,
                max: 1500,
                ticks: {
                  stepSize: 20,
                 },
             },

            },
          }
          
      });
        this.previousMonthPrescriptionchart.update();
  }, error => {
        console.log(error);
      });
  }

  getCurrentUserReport(){
    this.homeService.getCurrentUserNameAndTotalPatientReport().subscribe(response => {
      this.currentUserInfo = response;
        this.dialog.open(FrontDialogComponent, {
          data: {
            title: `
              ${this.greet} ${response.name}
              Happy to connect with you again. your service are always 
              valuable for us. 
              So far, you’ve served ${response.patientCount} community patients.
              Thank you for all of your contributions.
    
            `,
            details: `
            
            `
          },
        });

    }, error => {
      console.log(error);
    })
  }

  private dataLabelPlugin = function(chart, easing) {
    // To only draw at the end of animation, check for easing === 1
    const ctx = chart.ctx;
    const fontSize = 12;
    const fontStyle = 'normal';
    const fontFamily = 'open sans';
    const padding = 5;

    chart.data.datasets.forEach((dataset, key) => {
        let meta = chart.getDatasetMeta(key);
        if (!meta.hidden) {
            meta.data.forEach((element, index) => {
                let position = element.tooltipPosition();
                // Just naively convert to string for now
                let dataString = dataset.data[index].toString();

                ctx.fillStyle = '#676a6c';

               // ctx.font = Chart..helpers.fontString(fontSize, fontStyle, fontFamily);
                // Make sure alignment settings are correct
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
            });
        }
    });
};
}
