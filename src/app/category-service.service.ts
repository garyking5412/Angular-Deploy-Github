import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  constructor(private http: HttpClient) {}
  getFromApi(url: string): Observable<any> {
    return this.http.get(url);
  }
  postToApi(url: string, entity: any): Observable<any> {
    return this.http.post(url, entity);
  }
}
