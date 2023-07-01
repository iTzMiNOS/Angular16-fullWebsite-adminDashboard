import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  constructor(private authS: AuthService){}
  isLogged$: Observable<boolean>
  ngOnInit(): void {
    this.isLogged$ = this.authS.isLoggedIn();
  }
}
