import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Advertize } from './model/advertize';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertizeService {
  private restUrl = environment.apiUrl;
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<Advertize[]>{
    return this.http.get<Advertize[]>(this.restUrl+'/advertise');
  }

  save(adv: Advertize): Observable<Advertize>{
    return this.http.post<Advertize>(this.restUrl+'/advertise', adv, this.options);
  }

  delete(id: string): Observable<Object>{
    return this.http.delete<Object>(`${this.restUrl}/advertise/${id}`);
  }

  get(id: string): Observable<Advertize>{
    return this.http.get<Advertize>(`${this.restUrl}/advertise/${id}`);
  }

  edit(id: string, adv: Advertize): Observable<Advertize>{
    return this.http.put<Advertize>(`${this.restUrl}/advertise/${id}`, adv, this.options);
  }

  updateAll(adv: Advertize[]): Observable<Object>{
    return this.http.put<Object>(`${this.restUrl}/advertise/`, adv, this.options);
  }
}
