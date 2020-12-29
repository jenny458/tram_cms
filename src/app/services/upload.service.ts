import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private restUrl = '';
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    public http: HttpClient
  ) { }


  upload(folder: string, file: File): Observable<any>{
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post<any>(`${this.restUrl}/upload/${folder}`, formData);
  }
}
