import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { SpinnerService } from 'src/app/service/spinner.service';
import { UserService } from 'src/app/service/user.service';

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
    { email: 'jicago2505@harcity.com', password: '123456', imagen: './../../../assets/Langoni.jpg' },
    { email: 'hisor43266@dmtubes.com', password: '123456', imagen: './../../../assets/Benedetto.jpg' },
    { email: 'yajov94283@dmtubes.com', password: '123456', imagen: './../../../assets/Pol2.jpg' }
  ]
  especialistas: any[] = [
    { email: 'dinedot582@dmtubes.com', password: '123456', imagen: './../../../assets/Fabra.jpg' },
    { email: 'feyoy30014@dmtubes.com', password: '123456', imagen: './../../../assets/Rossi.jpg' },
  ]

  constructor(private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService,
    private spinnerSrv: SpinnerService) {


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
    try {
      await this.authSrv.login(datos.email, datos.password).then(async (resp) => {
        const user = (await this.userSrv.getUserByUid('' + resp?.user?.uid).toPromise()).data();
        console.log(user);

        switch (user.tipoUsuario) {
          case 'Paciente':
            if (resp?.user?.emailVerified) {
              localStorage.setItem('usuario-clinica', JSON.stringify({ ...user }));
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
