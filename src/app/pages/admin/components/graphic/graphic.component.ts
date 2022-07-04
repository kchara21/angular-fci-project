import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartConfiguration, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit {
 //Para el Grafico
 dateValue = [];
 numValue:any= [];
 paramName = '';
 filtroParam;
 date;

 @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private valueSvc: ValueService) { }

  ngOnInit(): void {

    const { end, selectedParam,start,piscina} =  this.data.filtroParam.value; 
    this.valueSvc.getReportById(piscina, selectedParam, start, end)
    .subscribe(values => {
      values.valParPool.forEach(value => {
        let fecha = moment(value.createdAt).format("YY-MM-DD HH:mm:ss a")
        this.numValue.push(value.valor)
        this.dateValue.push(fecha)
        this.paramName = value.parametro.nombre;
        this.lineChartData.datasets = [{data: this.numValue,label:this.paramName}]
      });

      this.chart?.update();

    }
    )

  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: null,
        label: '',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
     
    ],
    labels: this.dateValue

    
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
    
      'y-axis-0':
        {
          position: 'left',
          min:0
        },
      
    },

    plugins: {
      legend: { display: true },
     
    }
    
  };

  public lineChartType: ChartType = 'line';

  
 

  

}
