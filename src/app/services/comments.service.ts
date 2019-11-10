import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`${this.url}/comments`);
  }

  addComment(data) {
    return this.http.post(`${this.url}/comments`, data);
  }

  editComment(data) {
    return this.http.put(`${this.url}/comments/${data.id}`, data);
  }

  deleteComment(id) {
    return this.http.delete(`${this.url}/comments/${id}`);
  }
}
