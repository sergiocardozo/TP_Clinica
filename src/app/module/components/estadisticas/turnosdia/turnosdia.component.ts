import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { Chart } from 'node_modules/chart.js';
import { TurnosService } from 'src/app/service/turnos.service';

@Component({
  selector: 'app-turnosdia',
  templateUrl: './turnosdia.component.html',
  styleUrls: ['./turnosdia.component.css']
})
export class TurnosdiaComponent implements OnInit {
  
  labels: Array<string> = ['Lunes', 'Martes'];
  data: Array<number> = [];
  dias: Array<any> = [];
  turnos:Array<any>=[];
  ahora = moment().format("DD-MM-YYYY HH:mm");
  listaTurno: Array<any> = [];

  constructor(private turnoSrv: TurnosService) {
    this.turnoSrv.getTurnosDia().subscribe( resp => {
      this.turnos = resp;
      resp.forEach( turn => {
        if(!this.dias.includes(turn.dia)){
          this.dias.push(turn.dia);
        }
      })
    })

    setTimeout(() => {
      let cont = 0;
      this.dias.forEach( dia => {
        cont = 0;
        this.turnos.forEach(turn => {
          if(dia === turn.dia) {
            cont += 1;
          }
        })
        this.data.push(cont);
      })
    }, 1000);
   }

  ngOnInit(): void {
    const myChart = new Chart("turnosPorDia", {
      type: 'bar',
      data: {
        labels: this.dias,
        datasets: [{
          label: 'Turnos por dia',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    }); 
  }

  downloadPDF() {
    // Extraemos el
    const DATA: any = document.getElementById('divChart');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {
  
      const img = canvas.toDataURL('image/PNG');
  
      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_.pdf`);
    });
  }

}
