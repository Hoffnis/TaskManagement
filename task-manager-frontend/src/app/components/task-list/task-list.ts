import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 

import { TaskService } from '../../services/task';
import { TaskResponse } from '../../models/task.models';
import { TaskStatus } from '../../models/task-status.enum';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
  standalone: true, 
  imports: [CommonModule, RouterModule, FormsModule]
})
export class TaskListComponent implements OnInit {
  tasks: TaskResponse[] = [];
  loading = false;
  
  paginaAtual = 0;
  totalPaginas = 0;
  totalElementos = 0;

  statusFilter = '';
  responsavelFilter = '';
  
  TaskStatus = TaskStatus;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(pagina: number = 0): void {
    this.loading = true;
    this.paginaAtual = pagina;

    const statusValue = this.statusFilter ? this.statusFilter as TaskStatus : undefined;
    const responsavelValue = this.responsavelFilter.trim() || undefined;

    this.taskService.listar(this.paginaAtual, 5, statusValue, responsavelValue)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (response) => {
          this.tasks = response.content;
          this.totalPaginas = response.totalPages;
          this.totalElementos = response.totalElements;
        },
        error: () => alert('Erro ao buscar as tarefas do servidor.')
      });
      this.loading = false
  }

  aplicarFiltros(): void {
    this.carregarTarefas(0);
  }

  excluirTarefa(id: number): void {
    if (confirm('Deseja realmente remover esta tarefa?')) {
      this.loading = true;
      this.taskService.excluir(id)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            alert('Tarefa removida com sucesso!');
            this.carregarTarefas(this.paginaAtual);
          },
          error: () => alert('Erro ao tentar excluir a tarefa.')
        });
    }
  }
}