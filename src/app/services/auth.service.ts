import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router:Router) { }
  isLoggedGuard: boolean = false;
  login(email,password){
    this.afAuth.signInWithEmailAndPassword(email,password).then(lofRef =>{
      this.toastr.success("Logged in successfully");
      this.loadUser();
      this.isLoggedGuard = true;
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }).catch(e =>{
      this.toastr.warning("Check your credentials and Try again");
    })
  }

  loadUser(){
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('user',JSON.stringify(user));
    });
  }
  logOut(){
    this.afAuth.signOut().then(()=>{
      this.toastr.success("Logged out successfully");
      localStorage.removeItem('user');
      this.isLoggedGuard = false;
      this.loggedIn.next(false);
      this.router.navigate(['/login']);
    })
  }
  isLoggedIn(){
    return this.loggedIn.asObservable();
  }

}
