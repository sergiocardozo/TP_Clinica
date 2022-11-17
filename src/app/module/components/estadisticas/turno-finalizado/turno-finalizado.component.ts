import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-turno-finalizado',
  templateUrl: './turno-finalizado.component.html',
  styleUrls: ['./turno-finalizado.component.css']
})
export class TurnoFinalizadoComponent implements OnInit {
  listaEspecialistas: Array<any> = [];
  listaTurnos: Array<any> = [];
  labels: Array<any> = []
  data: Array<number> = [];
  public ahora = moment().format("DD-MM-YYYY HH:mm");
  constructor(private userSrv: UserService, private turnosSrv: TurnosService) {

    this.userSrv.getEspecialistas().subscribe((res: any) => {
      this.listaEspecialistas = res;
    })

    this.turnosSrv.getTurnos().subscribe((resp) => {
      this.listaTurnos = resp;
    })


    setTimeout(() => {
      let count = 0;
      this.listaEspecialistas.forEach(especialista => {
        this.labels.push((especialista.apellido + ' ' + especialista.nombre))
        count = 0;
        this.listaTurnos.forEach(turno => {
          if (turno.estado == 'Finalizado' && especialista.uid == turno.uidEspecialista) {
            count += 1;
          }
        });
        this.data.push(count)
      });

    }, 1000);
  }


  ngOnInit(): void {

    const myChart = new Chart("turnofinalizado", {
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
