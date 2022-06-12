import { HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { INewPatientCreatedByDateAndBranch } from 'src/app/core/models/Report/NewPatientCreatedByDate';
import { IPatientsCountAccordingToBranchBetweenTwoDates } from 'src/app/core/models/Report/NewPatientCreatedByDate';
import { TableUtil } from 'src/app/Shared/Inputes/ExportAsExcel/TableUtil';
import { ReportService } from '../report.service';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';
import { Tooltip } from 'chart.js';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-patient-count-by-branch-and-date',
  templateUrl: './patient-count-by-branch-and-date.component.html',
  styleUrls: ['./patient-count-by-branch-and-date.component.css']
})
export class PatientCountByBranchAndDateComponent implements OnInit , AfterViewInit {

  @ViewChild('documentSection')
  private documentSection: ElementRef;

  title = 'Patient Tally Report';
  footerName = 'Report';
  newPatientsCreatedByDateAndBranch: INewPatientCreatedByDateAndBranch[] = [];
  patientCreationReportWithTotals: IPatientsCountAccordingToBranchBetweenTwoDates;
  patientSearchFormByDate: FormGroup = new FormGroup({});
  displayedColumns: string[] = [ 'BranchName', 'Doctor', 'MalePatient', 'FemalePatient',
  'TotalPatient'];
  dataSource = new MatTableDataSource<INewPatientCreatedByDateAndBranch>(this.newPatientsCreatedByDateAndBranch);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  doctorsName: string[] = [];
  malePatient: number[] = [];
  femalePatient: number[] = [];
  totalPatient: number[] = [];
  chart: Chart;
  newwidth = (this.doctorsName.length * 30) + 100;
  wscols = [
    {wch: 30},
    {wch: 30},
    {wch: 6},
    {wch: 6},
    {wch: 6}
  ];
  constructor(private reportService: ReportService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createPatientSearchFormByDate();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  createPatientSearchFormByDate(){
    this.patientSearchFormByDate = this.fb.group({
      startDate: new FormControl(),
      endDate: new FormControl()
    });
  }
  patientCountAccordingToDateAndBranch(){
    // int chart Data
    this.doctorsName = [];
    this.malePatient = [];
    this.femalePatient = [];
    this.totalPatient = [];
    if (this.chart) {
      this.chart.destroy();
    }
    // report function
    if (this.patientSearchFormByDate.value.startDate && this.patientSearchFormByDate.value.endDate){

      const startDate = moment(this.patientSearchFormByDate.value.startDate).format('YYYY-MM-DD');
      const endDate = moment(this.patientSearchFormByDate.value.endDate).format('YYYY-MM-DD');
      this.reportService.getNewPatientListAccordingToDateAndBranch(startDate, endDate).subscribe(response => {
        this.patientCreationReportWithTotals = response;

        // Implement Chart Data
        response.patientsCountAccordingToBranchBetweenTwoDatesDto.forEach((res) => {
          this.doctorsName.push(res.doctorsName + '(' + res.branchName + ')');
          this.malePatient.push(res.totalMalePatient);
          this.femalePatient.push(res.totalFemalePatient);
          this.totalPatient.push(res.totalPatient);
        });
        this.chart = new Chart('ctx', {
          type: 'bar',
          data: {
              labels: this.doctorsName,
              datasets: [
                {
                  barThickness : 30,
                  // barPercentage: 0.5,
                  label: 'Male Patient',
                  data: this.malePatient,
                  backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                  ],
                  borderColor: [
                      'rgba(54, 162, 235, 1)',
                  ],
                  borderWidth: 1
              },
              {
              barThickness : 30,
                // barPercentage: 0.5,
                label: 'Female Patient',
                data: this.femalePatient,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            },
          //   {
          //     // barThickness: 16,
          //     // barPercentage: 0.5,
          //     label: 'Total Patient',
          //     data: this.totalPatient,
          //     backgroundColor: [
          //         'rgba(255, 206, 86, 0.2)',
          //     ],
          //     borderColor: [
          //         'rgba(255, 206, 86, 1)',
          //     ],
          //     borderWidth: 1
          // }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
              x: {
                position: 'top',
                stacked: true,
             },
              y: {
                stacked: true,
                ticks: {
                   autoSkip: false,
                   maxRotation: 0,
                   minRotation: 0
                 },
             },

            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const chartInstance = this.chart;
                    const data = chartInstance.data;
                    const data1 =  data.datasets[0].data[context.dataIndex];
                    const data2 = data.datasets[1].data[context.dataIndex];
                    const total = +data1 + +data2;

                    let label = context.dataset.label || '';
                    if (label) {
                        label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      const currentData = context.dataset.data[context.dataIndex];
                      const percentage = (100 * currentData  / total).toFixed(2);
                      label += currentData + ' (' + percentage + '%)';
                    }
                    return label;
                },
                  footer: (tooltipItems) => {
                    const chartInstance = this.chart;
                    const data = chartInstance.data;
                    let total: number ;
                    tooltipItems.forEach(element => {
                      const data1 =  data.datasets[0].data[element.dataIndex];
                      const data2 = data.datasets[1].data[element.dataIndex];
                      total = +data1 + +data2;
                    });
                    return 'Total: ' + total;
                  }
                }
              }
          },
          }
      });
        this.chart.update();
  }, error => {
        console.log(error);
      });
    }
    else{
      this.dataSource = new MatTableDataSource<INewPatientCreatedByDateAndBranch>();
    }
  }
  exportArray() {
    if (confirm('Are you sure to Download ?')) {
      const summary = this.dataSource.filteredData.map(x => ({
        BranchName: x.branchName,
        CreatedBy: x.doctorsName,
        Male: x.totalMalePatient,
        Female: x.totalFemalePatient,
        Total: x.totalPatient,
      }));
      TableUtil.exportArrayToExcel(summary, `PatientCreationSummary ${this.patientSearchFormByDate.value.startDate} - ${this.patientSearchFormByDate.value.endDate}`);
    }
  }

  exportexcel(): void
  {
    if (confirm('Are you sure to Download ?')){
      const fileName = `PatientCreationSummary-${this.patientSearchFormByDate.value.startDate}- ${this.patientSearchFormByDate.value.endDate}.xlsx`;
      const element = document.getElementById('print-section');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
      ws['!cols'] = this.wscols;
       /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
       /* save to file */
      XLSX.writeFile(wb, fileName);
    }
  }
  onSubmit(){
    this.patientCountAccordingToDateAndBranch();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
