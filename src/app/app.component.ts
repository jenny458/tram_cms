import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cms';
  username = "";
  password = "";
  isLogin = false;

  login(){
    if(this.username === "admin" && this.password === "password!@#"){
        this.isLogin = true;
    }
  }

  logout(){
    this.isLogin = false;
  }
}
