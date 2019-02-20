import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Auth } from '../shared/Auth';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getToken(token: string): Observable<Auth> {
    const params = new HttpParams()
      .set('grant_type', 'password')
      .set('username', 'INTRA')
      .set('password', token);
    return this.http.post<Auth>(environment.authUrl, params.toString(), headers);
  }

  refreshToken(token: string): Observable<Auth> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('username', 'INTRA')
      .set('refresh_token', token);
    return this.http.post<Auth>(environment.authUrl, params.toString(), headers);
  }
}
