import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskRequest, TaskResponse } from '../models/task.models';
import { TaskStatus } from '../models/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'http://localhost:8080/api/tasks'; 

  constructor(private http: HttpClient) {}


  listar(page: number = 0, size: number = 10, status?: TaskStatus, responsavel?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (status) {
      params = params.set('status', status);
    }
    if (responsavel) {
      params = params.set('responsavel', responsavel);
    }

    return this.http.get<any>(this.API_URL, { params });
  }

  buscarPorId(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.API_URL}/${id}`);
  }

  criar(task: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.API_URL, task); 
  }

  atualizar(id: number, task: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.API_URL}/${id}`, task); 
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}