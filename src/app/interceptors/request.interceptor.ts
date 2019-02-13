import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Auth } from '../shared/auth';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token.
        const auth = sessionStorage.getItem('auth');
        if (!auth) {
            return;
        }
        const authorization = JSON.parse(auth);
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const newRequest = request.clone({
            setHeaders: { Authorization: authorization.token_type + ' ' + authorization.access_token }
        });

        return next.handle(newRequest).pipe(
            catchError((error: Error) => {
                console.log('handle error: ', error);
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) {
                        return this.handle401Error(authorization.refresh_token, request, next);
                    } else {
                        return throwError(error.message);
                    }
                } else {
                    return throwError(error);
                }
            }));
    }

    handle401Error(refreshToken: string, request: HttpRequest<any>, next: HttpHandler) {
        console.log('handle 401');

        return this.authService.refreshToken(refreshToken).pipe(
            switchMap((auth: Auth) => {
                console.log('refresh token', auth);
                sessionStorage.setItem('auth', JSON.stringify(auth));
                const newRequest = request.clone({
                    setHeaders: { Authorization: auth.token_type + ' ' + auth.access_token }
                });
                return next.handle(newRequest);
            }),
            catchError((error) => {
                console.log('error', error);
                return throwError(error);
            })
        );
    }
}
