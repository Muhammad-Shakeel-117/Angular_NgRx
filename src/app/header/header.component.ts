import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { getLoggedUser } from '../auth/states/auth.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { logout } from '../auth/states/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  loggedUser$!: Observable<User | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(getLoggedUser);
  }

  onLogoutClicked(){
    this.store.dispatch(logout());
  }

}
