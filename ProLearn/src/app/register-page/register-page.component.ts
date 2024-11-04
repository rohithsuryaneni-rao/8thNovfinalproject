import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  
    user = {
      name: '',
      email: '',
      password: ''
    };
  
    constructor() {}
  
    onSubmit() {
      console.log('User registered:', this.user);
      // Here you can add logic to send the user data to the server.
      // For example, you could use a registration service.
    }
  }
