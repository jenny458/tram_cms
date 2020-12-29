import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Promotion } from './model/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private restUrl = '';
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<Promotion[]>{
    return this.http.get<Promotion[]>(this.restUrl+'/promotion');
  }

  save(promotion: Promotion): Observable<Promotion>{
    return this.http.post<Promotion>(this.restUrl+'/promotion', promotion, this.options);
  }

  delete(id: string): Observable<Object>{
    return this.http.delete<Object>(`${this.restUrl}/promotion/${id}`);
  }

  get(id: string): Observable<Promotion>{
    return this.http.get<Promotion>(`${this.restUrl}/promotion/${id}`);
  }

  edit(id: string, promotion: Promotion): Observable<Promotion>{
    return this.http.put<Promotion>(`${this.restUrl}/promotion/${id}`, promotion, this.options);
  }
}
