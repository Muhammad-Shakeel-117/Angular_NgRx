import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { delay, Observable } from 'rxjs';
import { getErrorMessage, getIsLoading } from './shared/shared.selector';
import { AsyncPipe, NgIf } from '@angular/common';
import { ToasterComponent } from './toaster/toaster.component';
import { autoLogin } from './auth/states/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    LoaderComponent,
    NgIf,
    AsyncPipe,
    ToasterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular_NgRx';
  showLoading$!: Observable<boolean>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<AppState>) {}
  ngOnInit(): void {
    this.showLoading$ = this.store.select(getIsLoading).pipe(delay(0));
    this.errorMessage$ = this.store.select(getErrorMessage).pipe(delay(0));
    this.store.dispatch(autoLogin());
  }
}
