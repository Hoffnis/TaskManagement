import { TaskStatus } from './task-status.enum';

export interface TaskRequest {
  titulo: string;
  descricao?: string;
  responsavel: string;
  status: TaskStatus;
}

export interface TaskResponse {
  id: number;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  dataCriacao: string;
  dataConclusao?: string;
  responsavel: string;
}