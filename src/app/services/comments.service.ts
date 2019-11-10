import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(`/comments`);
  }

  addComment(data) {
    return this.http.post(`/comments`, data);
  }

  editComment(data) {
    return this.http.put(`/comments/${data.id}`, data);
  }

  deleteComment(id) {
    return this.http.delete(`/comments/${id}`);
  }
}
