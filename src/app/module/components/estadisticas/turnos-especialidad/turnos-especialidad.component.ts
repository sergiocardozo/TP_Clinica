import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { UserService } from 'src/app/service/user.service';
import { TurnosService } from 'src/app/service/turnos.service';

@Component({
  selector: 'app-turnos-especialidad',
  templateUrl: './turnos-especialidad.component.html',
  styleUrls: ['./turnos-especialidad.component.css']
})
export class TurnosEspecialidadComponent implements OnInit {

  especialidades: Array<any> = [];
  turnos: Array<any> = [];
  labels: Array<string> = [];
  data: Array<number> = [];
  cant = 0;
  ahora = moment().format("DD-MM-YYYY HH:mm")
  constructor(private usrSrv: UserService, private turnoSrv: TurnosService) {
    this.turnoSrv.getTurnos().subscribe(respTurnos => {
      this.turnos = respTurnos;
    })

    this.usrSrv.getEspecialidad().subscribe(res => {
      res.forEach(esp => {
        this.cant = 0;
        this.labels.push(esp.nombre);
        this.turnos.forEach(turno => {
          if (esp.nombre === turno.especialidad) {
            this.cant += 1;
          }
        });
        this.data.push(this.cant);
      })
    })

    
  }

  ngOnInit(): void {
    const myChart = new Chart("turnosespecialidad", {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{

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

  descargarPDF() {
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
