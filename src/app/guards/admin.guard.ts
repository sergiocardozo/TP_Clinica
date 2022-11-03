import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let ls = localStorage.getItem('usuario-clinica');

      if( ls != null){
        let userJson =    JSON.parse(ls); 
        if(  userJson.perfil =='Administrador'){
          return true;
        }
      }else{
        return   false;
      }

      return false;
  }
  
}
