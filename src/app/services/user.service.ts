import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  get(): Observable<User> {
    return this.http.get<User>(environment.userarioUrl);
  }

  getUserClaims() {
    return this.http.get(environment.getClaims);
  }

  getPerfiles() {
    let reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.get(environment.getPerfiles, { headers: reqHeader});
  }

  perfilMatch(perfilesPermitidos): boolean {
    let isMatch = false;
    let userPerfil: number = JSON.parse(sessionStorage.getItem('userPerfil'));
    perfilesPermitidos.forEach(element => {
      if (userPerfil === element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

}
