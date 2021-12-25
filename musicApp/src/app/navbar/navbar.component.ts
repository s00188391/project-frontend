import { isFakeTouchstartFromScreenReader } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated; 
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authListenerSubs.unsubscribe();
  }

}
