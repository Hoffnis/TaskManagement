import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../../services/task';
import { TaskStatus } from '../../models/task-status.enum';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule]
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  taskId?: number;
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      responsavel: ['', Validators.required],
      status: [TaskStatus.PENDENTE, Validators.required]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = +idParam;
      this.carregarDadosTarefa(this.taskId);
    }
  }

  carregarDadosTarefa(id: number): void {
    this.loading = true;
    this.taskService.buscarPorId(id)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (task) => this.taskForm.patchValue(task),
        error: () => {
          alert('Erro ao carregar os dados desta tarefa.');
          this.router.navigate(['/tasks']);
        }
      });
  }

  salvar(): void {
    if (this.taskForm.invalid) return;

    this.loading = true;
    const dadosFormulario = this.taskForm.value;

    const requisicao$ = this.taskId
      ? this.taskService.atualizar(this.taskId, dadosFormulario)
      : this.taskService.criar(dadosFormulario);

    requisicao$
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          alert('Dados salvos com absoluto sucesso!');
          this.router.navigate(['/tasks']);
        },
        error: () => alert('Ocorreu um problema ao salvar a tarefa.')
      });
  }
}
