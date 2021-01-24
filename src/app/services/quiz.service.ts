import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from './model/quiz';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private restUrl = environment.apiUrl;
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }

  getAll(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(this.restUrl+'/quiz');
  }

  save(quiz: Quiz): Observable<Quiz>{
    return this.http.post<Quiz>(this.restUrl+'/quiz', quiz, this.options);
  }

  delete(id: string): Observable<Object>{
    return this.http.delete<Object>(`${this.restUrl}/quiz/${id}`);
  }

  get(id: string): Observable<Quiz>{
    return this.http.get<Quiz>(`${this.restUrl}/quiz/${id}`);
  }

  edit(id: string, quiz: Quiz): Observable<Quiz>{
    return this.http.put<Quiz>(`${this.restUrl}/quiz/${id}`, quiz, this.options);
  }

  search(key: String): Observable<Quiz[]>{
    return this.http.post<Quiz[]>(this.restUrl+'/quiz/search', {key:key}, this.options);
  }
}
