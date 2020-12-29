import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setting } from './model/setting';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  private restUrl = '';
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<Setting[]>{
    return this.http.get<Setting[]>(this.restUrl+'/setting');
  }

  save(seting: Setting): Observable<Setting>{
    return this.http.post<Setting>(this.restUrl+'/setting', seting, this.options);
  }

  delete(id: string): Observable<Object>{
    return this.http.delete<Object>(`${this.restUrl}/setting/${id}`);
  }

  get(id: string): Observable<Setting>{
    return this.http.get<Setting>(`${this.restUrl}/setting/${id}`);
  }

  edit(id: string, seting: Setting): Observable<Setting>{
    return this.http.put<Setting>(`${this.restUrl}/setting/${id}`, seting, this.options);
  }
}
