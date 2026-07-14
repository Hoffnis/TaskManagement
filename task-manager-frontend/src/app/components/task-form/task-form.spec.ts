import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. Corrija o import para usar o nome correto da classe exportada
import { TaskFormComponent } from './task-form';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      imports: [TaskFormComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    
    
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});