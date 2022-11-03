import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent {

  email: string = '';
  image: string = '';
  isAdmin = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
    private authSrv: AuthService,
    private router: Router,
    private userSrv: UserService
  ) {
    
    let ls = localStorage.getItem('usuario-clinica');
    if (ls != null) {
      let user = JSON.parse(ls);
      this.email = user.email;
      this.image = user.photoURL;
      if (user.tipoUsuario === 'Administrador') {
        this.isAdmin = true;
      }
    }
  }



async logout() {
  await this.authSrv.logout().then(resp => {
    this.router.navigate(['home']);
  })

}
}
