import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { LogsService } from 'src/app/service/logs.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /*   usuario: User */
  formulario: FormGroup;
  error: boolean = false;
  message: string = '';
  usuarios: any[] = [
    { email: 'scardozo.sc@gmail.com', password: '123456', imagen: './../../../assets/about.jpg' },

  ]
  pacientes: any[] = [
    { email: 'generod147@harcity.com', password: '123456', imagen: './../../../assets/Langoni.jpg' },
    { email: 'sonita4842@dmtubes.com', password: '123456', imagen: './../../../assets/Benedetto.jpg' },
    { email: 'disav97274@dmtubes.com', password: '123456', imagen: './../../../assets/Pol2.jpg' }
  ]
  especialistas: any[] = [
    { email: 'hereyil442@fgvod.com', password: '123456', imagen: './../../../assets/Fabra.jpg' },
    { email: 'walaba3480@fgvod.com', password: '123456', imagen: './../../../assets/Rossi.jpg' },
  ]

  constructor(private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService,
    private spinnerSrv: SpinnerService,
    private logsSrv: LogsService) {


    this.formulario = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    })

  }

  ngOnInit(): void {

  }

  async login() {

    this.spinnerSrv.show();
    const form = this.formulario.value;
    let datos = {
      email: form.email,
      password: form.password
    }
    let log = {
      id: '',
      fecha: moment().format("DD-MM-YYYY HH:mm"),
      email: form.email
    }
    try {
      await this.authSrv.login(datos.email, datos.password).then(async (resp) => {
        const user = (await this.userSrv.getUserByUid('' + resp?.user?.uid).toPromise()).data();

        switch (user.tipoUsuario) {
          case 'Paciente':
            if (resp?.user?.emailVerified) {
              localStorage.setItem('usuario-clinica', JSON.stringify({ ...user }));
              log.id = resp.user.uid;
              this.logsSrv.addItem(log);
              this.spinnerSrv.hide();
              this.router.navigate(['/dashboard']);
            } else {
              this.spinnerSrv.hide();
              this.enviarMensajeError('Debes verificar tu email para ingresar.');
            }
            break;
          case 'Especialista':
            if (resp?.user?.emailVerified) {
              if (user.estadoAcceso !== 'Deshabilitado') {

                localStorage.setItem('usuario-clinica', JSON.stringify({ ...user }));
                log.id = resp.user.uid;
                this.logsSrv.addItem(log);
                this.spinnerSrv.hide();
                this.router.navigate(['/dashboard']);

              } else {
                this.spinnerSrv.hide();
                this.enviarMensajeError('El administrador debe validar tu usuario, contactate');
              }

            } else {
              this.spinnerSrv.hide();
              this.enviarMensajeError('Debes verificar tu email para ingresar.');
            }
            break;
          case 'Administrador':
            if (resp?.user?.emailVerified) {
              localStorage.setItem('usuario-clinica', JSON.stringify({ ...user }));
              log.id = resp.user.uid;
              this.logsSrv.addItem(log);
              this.spinnerSrv.hide();
              this.router.navigate(['/dashboard']);


            } else {
              this.spinnerSrv.hide();
              this.enviarMensajeError('Debes verificar tu email para ingresar.');
            }
            break;
          default:
            this.enviarMensajeError('No existe');
            break;
        }

      })
    } catch (error) {

    }
  }

  enviarMensajeError(mensaje: string) {
    this.error = true;
    this.message = mensaje;
    setTimeout(() => {
      this.message = '';
      this.error = false
      this.spinnerSrv.hide();
    }, 2000);
  }

  llenarForm(perfil: any) {
    this.formulario.setValue({ 'email': perfil.email, 'password': perfil.password })
  }
}
