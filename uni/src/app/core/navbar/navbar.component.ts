import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;

  constructor(
    private router: Router,
    private authservice: AuthService

  ) { }

  ngOnInit() {
    this.authservice.authStatus.subscribe(value => this.loggedIn = value);
  }

  logOut(event: MouseEvent) {
    this.authservice.logout();
    this.authservice.changedAuthStatus(false);
    this.router.navigateByUrl('/auth');
  }

}
