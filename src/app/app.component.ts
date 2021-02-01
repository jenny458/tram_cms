import { Component } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

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

  constructor(
    private localStorageService: LocalStorageService
  ){
    let localIsLogin: boolean = this.localStorageService.getOnLocalStorage();
    let localTime: number = this.localStorageService.getOnLocalTimeStampStorage();
    if(localIsLogin && (new Date().getTime() - localTime)<3600000){
      this.isLogin = true;
    }else{
      this.isLogin = false;
    }
  }

  login(){
    if(this.username === "admin" && this.password === "password!@#"){
      this.isLogin = true
      this.localStorageService.storeOnLocalStorage(this.isLogin);
    }
  }

  logout(){
    this.isLogin = false;
    this.localStorageService.storeOnLocalStorage(this.isLogin);
  }
}
