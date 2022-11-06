import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Especialidad } from 'src/app/models/especialidad.interface';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-cargaespecialidad',
  templateUrl: './cargaespecialidad.component.html',
  styleUrls: ['./cargaespecialidad.component.css']
})
export class CargaespecialidadComponent implements OnInit {

  @Output() datos = new EventEmitter<Array<string>>();

  message = 'datos enviados';
  especialidades: Array<Especialidad> = [];
  especialidadesElegidas: Array<any> = [];

  image: any;

  formularioEspecialidades: FormGroup;
  constructor(private userSrv: UserService, private storageSrv: StorageService) {
    this.userSrv.getEspecialidad().subscribe(resp => {

      this.especialidades = resp;
    })

    this.formularioEspecialidades = new FormGroup({
      especialidadCheck: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      pathImg: new FormControl('', Validators.required)
    })

  }

  ngOnInit(): void {
  }

  aceptarEspecialidad() {
    const form = this.formularioEspecialidades.value;

    let datos = {
      nombre: form.nombre,
      pathImg: this.image
    }

    this.userSrv.addEspecialidad(datos).then((res) => {
      this.formularioEspecialidades.reset();

    })
  }

  public cambioArchivo(event: any) {
    this.image = event.target.files[0];
    this.subirArchivo(this.image);
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo(data: any) {
    this.image = this.getFilePath()
    let task = this.storageSrv.uploadFile(this.image, data).then((res) => {
      res.ref.getDownloadURL()
        .then(ress => {

          this.image = (ress);


        });
    });
  }

  getFilePath() {
    const form = this.formularioEspecialidades.value
    return new Date().getTime() + '-' + form.nombre;
  }
  especialidad: Array<any> = [];

  sendMessage() {
    
    this.datos.emit(this.especialidadesElegidas);
  }

  selEsp(event: any) {
    if (event.target.checked == true) {
      this.especialidadesElegidas.push(event.target.value);
    }
    else if (event.target.checked == false) {
      const indice = this.especialidadesElegidas.indexOf(event.target.value).valueOf();
      this.especialidadesElegidas.splice(indice, 1);
    }
 
    console.log(this.formularioEspecialidades)
  }
}
