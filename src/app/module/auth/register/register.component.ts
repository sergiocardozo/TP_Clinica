import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from 'src/app/service/storage.service';
import { Especialidad } from 'src/app/models/especialidad.interface';
import { CargaespecialidadComponent } from '../cargaespecialidad/cargaespecialidad.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("myModalConf", { static: false }) myModalConf?: TemplateRef<any>;

  @Input() closed: boolean = false;
  @Input() tipo: string = '';
  @Output() seleccionReg = new EventEmitter<boolean>;

  displayEspecialidades: boolean = false;
  display: boolean = false;
  message: string = '';
  error: boolean = false;
  especialidades: Array<Especialidad> = [];
  completarForm = true;
  especialidadesElegidas: Array<any> = [];
  image: any;
  img1 = '';
  img2 = '';

  mensajeImagen: string;
  formulario: FormGroup;
  constructor(private spinnerSrv: SpinnerService,
    private auth: AuthService,
    private userSrv: UserService,
    private modalSrv: NgbModal,
    private storageSrv: StorageService
  ) {

    this.userSrv.getEspecialidad().subscribe(resp => {

      this.especialidades = resp;

    })
    this.formulario = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', [Validators.required, Validators.min(18), Validators.max(99)]),
      DNI: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]),
      pathImg: new FormControl(null, Validators.required),
      pathImg2: new FormControl(null, Validators.required),
      obraSocial: new FormControl('', Validators.required),
      especialidadesElegidas: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmarPass: new FormControl('', Validators.required),
    })

  }

  ngOnInit(): void {

  }

  

  async register() {

    console.log(this.especialidadesElegidas);
    this.spinnerSrv.show();
    const form = this.formulario.value;
    this.completarForm = false;
    if (this.tipo === 'Especialista') {
      
      let datos = {
        nombre: form.nombre,
        apellido: form.apellido,
        edad: form.edad,
        dni: form.DNI,
        email: form.email,
        photoURL: this.img1,
        tipoUsuario: this.tipo,
        estadoAcceso: 'Deshabilitado',
        especialidad: this.especialidadesElegidas
      }

      if (form.password === form.confirmarPass) {

        try {

          await this.auth.register(datos.email, form.password).then((resp) => {
            console.log(resp);
            this.userSrv.setItemId(datos, resp.user.uid).then(() => {
              this.display = true;
              this.spinnerSrv.hide();
              this.formulario.reset();
            })

          }).catch(error => {
            switch (error.code) {
              case 'auth/email-already-exists':
                this.enviarMensajeError('El usuario ya existe')
                break;
              case 'auth/invalid-email':
                this.enviarMensajeError('El email ingresado no es correcto');
                break;
              case 'auth/user-not-found':
                this.enviarMensajeError('No existe registro con ese usuario');
                break;
              default:
                this.enviarMensajeError(error.message);
                break;
            }
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        this.spinnerSrv.hide()
        this.enviarMensajeError('Las contraseñas deben coincidir');
      }

    } else if (this.tipo === 'Paciente') {

      let datos = {
        nombre: form.nombre,
        apellido: form.apellido,
        edad: form.edad,
        dni: form.DNI,
        email: form.email,
        photoURL: this.img1,
        photoURL2: this.img2,
        tipoUsuario: this.tipo,
        obraSocial: form.obraSocial
      }

      if (form.password === form.confirmarPass) {

        try {

          await this.auth.register(datos.email, form.password).then((resp) => {
            this.userSrv.setItemId(datos, resp.user.uid).then(() => {
              this.display = true;
              this.spinnerSrv.hide();
              this.formulario.reset();
            })

          }).catch(error => {
            switch (error.code) {
              case 'auth/email-already-exists':
                this.enviarMensajeError('El usuario ya existe')
                break;
              case 'auth/invalid-email':
                this.enviarMensajeError('El email ingresado no es correcto');
                break;
              case 'auth/user-not-found':
                this.enviarMensajeError('No existe registro con ese usuario');
                break;
              default:
                this.enviarMensajeError(error.message);
                break;
            }
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        this.spinnerSrv.hide()
        this.enviarMensajeError('Las contraseñas deben coincidir');
      }
    } else {

      let datos = {
        nombre: form.nombre,
        apellido: form.apellido,
        edad: form.edad,
        dni: form.DNI,
        email: form.email,
        password: form.password,
        photoURL: this.img1,
        tipoUsuario: this.tipo,
      }

      if (datos.password === form.confirmarPass) {

        try {

          await this.auth.register(datos.email, datos.password).then((resp) => {
            console.log(resp);
            this.userSrv.setItemId(datos, resp.user.uid).then(() => {
              this.display = true;
              this.spinnerSrv.hide();
              this.formulario.reset();
            })

          }).catch(error => {
            switch (error.code) {
              case 'auth/email-already-exists':
                this.enviarMensajeError('El usuario ya existe')
                break;
              case 'auth/invalid-email':
                this.enviarMensajeError('El email ingresado no es correcto');
                break;
              case 'auth/user-not-found':
                this.enviarMensajeError('No existe registro con ese usuario');
                break;
              default:
                this.enviarMensajeError(error.message);
                break;
            }
          })
        } catch (error) {
          console.log(error);
        }
      } else {
        this.spinnerSrv.hide()
        this.enviarMensajeError('Las contraseñas deben coincidir');
      }
    }
  }

  enviarMensajeError(mensaje: string) {
    this.error = true;
    this.message = mensaje;
    this.spinnerSrv.hide();

    setTimeout(() => {
      this.message = '';
      this.error = false
    }, 4000);
  }
  public cambioArchivo(event: any, num: number) {
    this.image = event.target.files[0];
    this.subirArchivo(this.image, num);
  }

  //Sube el archivo a Cloud Storage
  async subirArchivo(data: any, num: number) {
    this.spinnerSrv.show();
    if (num == 1) {
      this.img1 = this.getFilePath()
      let task = this.storageSrv.uploadFile(this.img1, data).then((res) => {
        res.ref.getDownloadURL()
          .then(ress => {
            this.spinnerSrv.hide();
            console.log(ress)

            this.img1 = (ress);


          });
      });
    } else {
      this.img2 = this.getFilePath()
      let task = this.storageSrv.uploadFile(this.img2, data).then((res) => {
        res.ref.getDownloadURL()
          .then(ress => {
            this.spinnerSrv.hide();
            console.log(ress)

            this.img2 = (ress);


          });
      });
    }

  }

  getFilePath() {
    return new Date().getTime() + '-' + this.tipo;
  }

  openEspecialidad(){
    this.displayEspecialidades = true;
  }
  
  reciboMensaje($event){
    this.especialidadesElegidas = $event;
    this.displayEspecialidades = false;
  }

}
