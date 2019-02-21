import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { User } from '../user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userClaims: User;

  constructor(private router: Router, public userService: UserService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data: User) => {
      this.userClaims = data;
    });
  }

  Logout() {
    sessionStorage.removeItem('auth');
    sessionStorage.removeItem('userPerfil');
    window.location.replace(environment.menuIntranet);
    // window.location.replace(environment.intranetDesa);
  }

}
