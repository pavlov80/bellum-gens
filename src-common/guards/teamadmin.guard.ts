import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class TeamadminGuard implements CanActivate {
  constructor(private authService: LoginService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isTeamAdmin(next.parent.params.teamid);
  }

  isTeamAdmin(teamid: string) {
    return this.authService.getUserIsTeamAdmin(teamid);
  }
}
