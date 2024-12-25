import { Component, OnInit } from '@angular/core';
import { Task } from '../../core/models/task';
import { TaskService } from '../../core/services/task.service';
import { ActivatedRoute, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-task-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {

  task?: Task;
  todayDate: Date = new Date();
  taskId: number = 0;
  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    priority: new FormControl('High', [Validators.required]),
    dueDate: new FormControl(`${this.todayDate.getFullYear()}-${this.todayDate.getMonth()}-${this.todayDate.getDate()}`, [Validators.required])
  });
  loggedInUser?: string;

  constructor(
    private taskService: TaskService,
    private activatedRoutes: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.activatedRoutes.paramMap.subscribe(params => {
      this.taskId = Number(params.get('taskId'));
    })
    this.task = taskService.getTaskById(this.taskId);
    if (this.task) {
      this.taskForm = new FormGroup({
        name: new FormControl(this.task?.name ?? "", [Validators.required, Validators.minLength(3)]),
        priority: new FormControl(this.task?.priority ?? "High", [Validators.required]),
        dueDate: new FormControl(this.task?.dueDate ?? (`${this.todayDate.getFullYear()}-${this.todayDate.getMonth()}-${this.todayDate.getDate()}`), [Validators.required])
      });
    }
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  ngOnInit(): void {
    
  }

  onSaveTask() {
    if (this.taskForm.valid) {
      if (this.taskId > 0) {
        let updatedTask: Task = {
          id: this.taskId,
          name: this.taskForm.value.name ?? "",
          completed: false,
          dueDate: this.taskForm.value.dueDate ?? "",
          priority: this.taskForm.value.priority ?? ""
        };
        this.taskService.updateTask(updatedTask);
      }
      else {
        let previousId = 0;
        const tasks = this.taskService.getTasks()
        if (tasks) {
          tasks.forEach((t: Task) => {
            if (t.id > previousId) {
              previousId = t.id;
            }
          })
        }
        let task: Task = {
          id: previousId + 1,
          name: this.taskForm.value.name ?? "",
          completed: false,
          dueDate: this.taskForm.value.dueDate ?? "",
          priority: this.taskForm.value.priority ?? ""
        };
        this.taskService.saveTask(task);
      }
      this.router.navigate(['/tasks'])
    }
    else {
      alert('invalid task')
    }
  }

}
