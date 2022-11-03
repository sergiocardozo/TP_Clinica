import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-validar-mail',
  templateUrl: './validar-mail.component.html',
  styleUrls: ['./validar-mail.component.css']
})
export class ValidarMailComponent implements OnInit {

  usuario: any;
  constructor( public readonly authServ: AuthService, private router: Router ) { 
  }

  ngOnInit(): void {
    this.authServ.isAuth().subscribe( user => {
      this.usuario = user.email;
    })
  }

  reenviar() {
    this.authServ.sendEmailVerification();
  }

  volver() {
    this.router.navigate(['/home'])
  }

}
