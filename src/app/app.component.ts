import { Component, OnInit } from '@angular/core';
import { User } from './shared/user';
import { Globals } from './shared/globals';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { environment } from '../environments/environment';
import { UserIdleService } from 'angular-user-idle';
import swal from 'sweetalert2';
import { Alert } from './shared/alert';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Excepciones';
  loading;
  completado = false;

  constructor(private userService: UserService, public globals: Globals, private router: Router
    , private userIdle: UserIdleService
  ) {
    this.globals.user = {} as User;
    this.loading = true;
  }

  ngOnInit() {
    this.userIdle.setConfigValues({ idle: environment.userIdleSeconds, timeout: 1, ping: 0 });
    this.userIdle.startWatching();

    this.userIdle.onTimerStart().subscribe(count => {
      console.log('Sesión expirada');
    });

    this.userIdle.onTimeout().subscribe(() => {
      let timerInterval: any;
      // tslint:disable-next-line:no-unused-expression
      swal.fire({
        title: 'Su sesión ha expirado!',
        html: 'La aplicación se cerrará en <strong></strong> segundos.',
        timer: environment.userIdleTimeoutSeconds * 1000,
        onBeforeOpen: () => {
          swal.showLoading();
          timerInterval = setInterval(() => {
            swal.getContent().querySelector('strong').textContent = Math.round(swal.getTimerLeft() / 1000).toString();
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
          this.userIdle.resetTimer();
        }
      }).then((result) => {
        if (result.dismiss === swal.DismissReason.timer) {
          swal.fire({ title: 'Su sesión ha finalizado' })
            .then((value) => {
              this.logout();
            });
        }
      });
    });

    this.getUser();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
      }
    });
  }

  getUser() {
    this.userService.get().subscribe((user: User) => {
      this.globals.user = user;
      this.router.navigate(['/inicio']);
      sessionStorage.setItem('userPerfil', user.Perfil.Id.toString());
    }, error => {
      Alert.error(error);
    });
  }

  logout() {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('userPerfil');
    window.location.replace(environment.intranet);
  }

}


