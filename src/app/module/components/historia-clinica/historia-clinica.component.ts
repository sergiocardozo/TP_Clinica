import { Component, OnInit } from '@angular/core';
import { HistoriaService } from 'src/app/service/historia.service';
import { TurnosService } from 'src/app/service/turnos.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {

  seleccion:string = '0';
  verSeleccion: string = '';
  public listaHistoriaClinica: Array<any> = [];
  public usuario: any;
  especialistas: Array<any> = [];
  public pacientes: Array<any> = [];
  public ahora = moment().format("DD-MM-YYYY HH:mm");
  atencion_descarga: any;
  mostrarTabla = false;
  constructor(private historiaSrv: HistoriaService, private turnoSrv: TurnosService, private usrSrv: UserService) {

    this.verSeleccion = this.seleccion;
    let ls = localStorage.getItem('usuario-clinica');
    if (ls != null) {
      this.usuario = JSON.parse(ls);
    }
    
    this.usrSrv.getEspecialistas().subscribe((res) => {
      this.especialistas = res;
    })

   
  }

  ngOnInit(): void {

  }

  capturar() {
    this.verSeleccion = this.seleccion;
    this.especialistas.forEach( espe => {
      let nombre: string = espe.nombre + ' ' + espe.apellido; 
      if(this.verSeleccion === nombre){
        this.historiaSrv.getHistorias_especialista(espe.uid).subscribe((res) => {
          this.listaHistoriaClinica = res;
          console.log(this.listaHistoriaClinica);
        })
      }
    })
  }
  verHistoria(atencion: any) {
    let opcionales: string = '';
    atencion.opcionales.forEach((opc: any) => {
      if (opc.key != '') {
        opcionales += ('' + opc.key + ': ' + opc.value + '<br>')
      }
    });
    Swal.fire(
      {
        title: (atencion.dia + ' ' + atencion.hora + '<hr>' + atencion.especialidad),
        icon: 'info',
        html: "Peso: " + atencion.peso + "<br>" + "Altura:" + atencion.altura + "<br>" + "Presion: " +
          atencion.presion + "<br>" + "Temperatura:" + atencion.temperatura + "<br>" + opcionales
      })
  }


  descargar(HC: any) {
    this.mostrarTabla = true;
    this.atencion_descarga = HC;
  }

  downloadPDF() {
    const DATA: any = document.getElementById('descarga');
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
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }


}
