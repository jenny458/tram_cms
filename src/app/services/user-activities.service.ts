import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivitiesService {

  private restUrl = environment.apiUrl;
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }


  countByDate(): Observable<any>{
    return this.http.get<any>(this.restUrl+'/user_activities/reportByDate');
  }

  countByHour(): Observable<any>{
    return this.http.get<any>(this.restUrl+'/user_activities/reportByHour');
  }

  getDateReport(): Observable<any>{
    return this.http.get<any>(this.restUrl+'/user_activities/getDateReport');
  }

  top10(): Observable<any>{
    return this.http.get<any>(this.restUrl+'/user/point/10?point=true');
  }

  getNewUser(): Observable<any>{
    return this.http.get<any>(this.restUrl+'/user/today');
  }
}
