import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

 
    email: string = '';
    password: string = '';
  
    constructor(private router: Router) {}
  
    onLogin(): void {
      if (this.email === 'test@prolearn.com' && this.password === 'password') {
        // Navigate to the dashboard or other secure area upon successful login
        this.router.navigate(['/dashboard']);
      } else {
        alert('Invalid email or password');
      }
    }
}
