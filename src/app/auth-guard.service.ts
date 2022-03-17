import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor() { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(sessionStorage.getItem('user')!=null){
      return true;
    }
    else{
      alert("Hãy đăng nhập để thực hiện thao tác này");
      return false;
    }
  }
}
