import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from 'src/Models/Patient';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup(
    {
      uname: new FormControl(''),
      password: new FormControl('')
    }
  );

  users: any = [];

  constructor(
    private router: Router,
    private appService: AppService
  )
  {

  }

  ngOnInit(): void {

  }

  get form() { return this.loginForm.value; }

  onSubmit() {
    const loggedInUser = (this.loginForm.value.uname);
    const loggedInPassword = (this.loginForm.value.password);
    console.log(this.loginForm.value.uname,this.loginForm.value.password);
    
    let match = false;
    this.appService.getPatient().subscribe((data) => {
      this.users = data;
      
      for (const user of this.users) {
        console.log(user.pname);
        if (user.pname === loggedInUser && loggedInPassword === user.password) {
          match = true;
          this.appService.setLoggedInUser(user);
        }
      }

      if (match) {
        this.router.navigate(['/patient-add']);
      }
      else {
        alert('Sikertelen bejelentkezés! Hibás a felhasználónév vagy a jelszó.');
      }
    });
  }

}
